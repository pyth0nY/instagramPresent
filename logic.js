console.log('🧠 [Logic] Módulo de lógica (con envío de avatar) cargado.');


const SUPABASE_URL = 'https://ptrpjcqqrcomskafisrx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0cnBqY3FxcmNvbXNrYWZpc3J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNzg0NTMsImV4cCI6MjA2Nzg1NDQ1M30.8iJvRGKuzhpQMQCOsg_mBlnCNc1U51V-Nmn81E0Aak4';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let myInstagramUsername = null;
let myAvatarUrl = null;
let lastActivity = '';
let activityCheckInterval = null;
const CHECK_INTERVAL = 15000;
const ACTIVE_THRESHOLD_MINUTES = 5;

function initializeLogic() {
    console.log('🚀 [Logic] Inicializando...');
    setTimeout(findMyInfo, 2000);
}

function findMyInfo() {
    if (myInstagramUsername) return true;
    const profileLink = Array.from(document.querySelectorAll('a')).find(a => 
        a.href && a.querySelector('img') && (a.textContent.trim() === 'Perfil' || a.querySelector('span')?.textContent.trim() === 'Perfil')
    );
    
    if (profileLink) {
        const username = new URL(profileLink.href).pathname.split('/')[1];
      
        const avatarImg = profileLink.querySelector('img');
        
        if (username && avatarImg && avatarImg.src) {
            console.log(`user encontrado: ${username}`);
            myInstagramUsername = username;
            myAvatarUrl = avatarImg.src;
            startActivityChecks();
            return true;
        }
    }
    
    console.log('');
    return false;
}

function startActivityChecks() {
    if (!activityCheckInterval) {
        console.log('');
        checkAndBroadcastStatus();
        activityCheckInterval = setInterval(checkAndBroadcastStatus, CHECK_INTERVAL);
    }
}

async function checkAndBroadcastStatus() {
    if (!myInstagramUsername) return;

    const currentActivity = determineMyActivity();
    if (currentActivity && (currentActivity !== lastActivity || !myAvatarUrl)) {
        lastActivity = currentActivity;
        console.log(` actividad enviada: ${currentActivity}`);
        try {
            await client.from('user_status').upsert({ 
                user_ig: myInstagramUsername,
                activity_text: currentActivity,
                avatar_url: myAvatarUrl, 
                last_updated: new Date().toISOString()
            }, { onConflict: 'user_ig' });

            document.dispatchEvent(new CustomEvent('activityUpdated', { detail: { activity: lastActivity } }));
        } catch (error) {
            console.error("Actividad no enviada", error);
        }
    }

    try {
        const threshold = new Date();
        threshold.setMinutes(threshold.getMinutes() - ACTIVE_THRESHOLD_MINUTES);

        const { data: friends, error } = await client
            .from('user_status')
            .select('user_ig, activity_text, avatar_url')
            .not('user_ig', 'eq', myInstagramUsername)
            .gt('last_updated', threshold.toISOString())
            .order('last_updated', { ascending: false });

        if (error) throw error;
        document.dispatchEvent(new CustomEvent('friendsActivityUpdated', { 
            detail: { 
                friends: friends || [] 
            } 
        }));

    } catch (error) {
        console.error("[Logic] Error al obtener actividad de amigos:", error);
    }
}

function determineMyActivity() {
    const url = window.location.href;
    if (url.includes('/reels/')) return 'Viendo Reels 📺';
    if (url.includes('/direct/')) return 'En sus Mensajes Directos 💬';
    if (url.includes('/explore/')) return 'Explorando 🧭';
    const urlPath = new URL(url).pathname;
    const pathSegments = urlPath.split('/').filter(Boolean);
    if (pathSegments.length === 1 && pathSegments[0] === myInstagramUsername) return 'Viendo su propio perfil 👀';
    if (pathSegments.length === 1 && !['reels', 'explore', 'direct', 'accounts', 'inbox'].includes(pathSegments[0])) return `Viendo el perfil de ${pathSegments[0]} 🕵️‍♂️`;
    if (urlPath === '/') return 'En el feed principal 🏠';
    return 'Navegando por Instagram 🌐';
}

initializeLogic();