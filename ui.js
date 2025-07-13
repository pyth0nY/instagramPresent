console.log('[UI] modulo cargado.');

let lastKnownActivity = 'Conectando...';

function initializeUI() {
    console.log('✨ [UI] Inicializando UI...');
    injectAndStyleFloatingWidget();

    document.addEventListener('activityUpdated', (event) => {
        lastKnownActivity = event.detail.activity;
        updateFloatingWidget();
    });

    document.addEventListener('friendsActivityUpdated', (event) => {
        const friends = event.detail.friends;
        console.log(`🎨 [UI] Recibida actividad de ${friends.length} amigos.`);
        updateFriendsList(friends);
    });
}

function makeWidgetDraggable(widget) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const dragHandle = widget.querySelector("#igp-my-activity-container");
    if (dragHandle) { dragHandle.onmousedown = dragMouseDown; }
    function dragMouseDown(e) { if (e.target.closest('.igp-friend-item')) return; e.preventDefault(); pos3 = e.clientX; pos4 = e.clientY; document.onmouseup = closeDragElement; document.onmousemove = elementDrag; if(dragHandle) dragHandle.style.cursor = 'grabbing'; }
    function elementDrag(e) { e.preventDefault(); pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY; pos3 = e.clientX; pos4 = e.clientY; widget.style.top = (widget.offsetTop - pos2) + "px"; widget.style.left = (widget.offsetLeft - pos1) + "px"; widget.style.bottom = 'auto'; widget.style.right = 'auto'; }
    function closeDragElement() { document.onmouseup = null; document.onmousemove = null; if(dragHandle) dragHandle.style.cursor = 'grab'; }
}

function injectAndStyleFloatingWidget() {
    if (document.getElementById('igp-nuclear-widget')) return;
    const widget = document.createElement('div');
    widget.id = 'igp-nuclear-widget';
    Object.assign(widget.style, { position: 'fixed', bottom: '30px', right: '30px', zIndex: '999999', display: 'flex', flexDirection: 'column', minWidth: '250px', backgroundColor: 'rgba(28, 30, 33, 0.95)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '10px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' });
    const myActivityContainer = document.createElement('div');
    myActivityContainer.id = 'igp-my-activity-container';
    Object.assign(myActivityContainer.style, { display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '4px', cursor: 'pointer' });
    const statusDot = document.createElement('span');
    Object.assign(statusDot.style, { width: '10px', height: '10px', backgroundColor: '#2ecc71', borderRadius: '50%', flexShrink: 0 });
    const statusText = document.createElement('span');
    statusText.id = 'igp-text';
    statusText.textContent = lastKnownActivity;
    Object.assign(statusText.style, { color: '#e4e6eb', fontSize: '14px', fontWeight: '600' });
    const friendsList = document.createElement('div');
    friendsList.id = 'igp-friends-list';
    friendsList.className = 'igp-friends-list';
    myActivityContainer.addEventListener('click', () => { friendsList.style.display = friendsList.style.display === 'flex' ? 'none' : 'flex'; });
    myActivityContainer.appendChild(statusDot);
    myActivityContainer.appendChild(statusText);
    widget.appendChild(myActivityContainer);
    widget.appendChild(friendsList);
    document.body.appendChild(widget);
    makeWidgetDraggable(widget);
    console.log('✅✅✅ [UI] Widget móvil INYECTADO.');
}

function updateFloatingWidget() {
    const textElement = document.getElementById('igp-text');
    if (textElement) { textElement.textContent = lastKnownActivity; }
}

function updateFriendsList(friends) {
    const listContainer = document.getElementById('igp-friends-list');
    if (!listContainer) return;
    listContainer.innerHTML = '';
    
    if (friends.length === 0) {
        const noFriendsMessage = document.createElement('div');
        noFriendsMessage.textContent = "Ningún amigo conectado.";
        Object.assign(noFriendsMessage.style, { fontSize: '12px', color: '#a8a8a8', padding: '10px 4px', fontStyle: 'italic' });
        listContainer.appendChild(noFriendsMessage);
        return;
    }
    
    friends.forEach(friend => {
        
        const item = document.createElement('div');
        item.className = 'igp-friend-item';

        const avatar = document.createElement('img');
        avatar.className = 'igp-friend-avatar';
        avatar.alt = `Avatar de ${friend.user_ig}`;
        avatar.src = friend.avatar_url || 'https://www.gravatar.com/avatar/?d=mp&s=150'; 
        
        avatar.onerror = () => { avatar.src = 'https://www.gravatar.com/avatar/?d=mp&s=150'; };

        const info = document.createElement('div');
        info.className = 'igp-friend-info';
        const name = document.createElement('div');
        name.className = 'igp-friend-name';
        name.textContent = friend.user_ig;
        const activity = document.createElement('div');
        activity.className = 'igp-friend-activity';
        activity.textContent = friend.activity_text;

        info.appendChild(name);
        info.appendChild(activity);
        item.appendChild(avatar);
        item.appendChild(info);
        listContainer.appendChild(item);
    });
}

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initializeUI); } else { initializeUI(); }