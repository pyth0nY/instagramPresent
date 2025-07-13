 

console.log('');
 
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

 
async function imageUrlToBase64(url) {
 
 
    const response = await fetch(PROXY_URL + url);
    if (!response.ok) {
        throw new Error(`No se pudo descargar la imagen desde ${url}`);
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getAvatar") {
        const username = request.username;
        const targetUrl = `https://www.instagram.com/${username}/`;
        console.log(`🔧 [Background] Petición para ${username} vía proxy...`);

        fetch(PROXY_URL + targetUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('El proxy no pudo acceder al perfil (puede ser privado o no existir).');
                }
                return response.text();
            })
            .then(html => {
                const regex = /<meta\s+property="og:image"\s+content="([^"]+)"/;
                const match = html.match(regex);
                if (match && match[1]) {
                    const avatarUrl = match[1].replace(/&/g, '&');
                    console.log(`🔧 [Background] URL encontrada: ${avatarUrl}. Descargando imagen vía proxy...`);
                    return imageUrlToBase64(avatarUrl);
                } else {
                    throw new Error('Etiqueta og:image no encontrada en el HTML del perfil.');
                }
            })
            .then(dataUrl => {
                console.log(`.`);
                sendResponse({ success: true, url: dataUrl });
            })
            .catch(error => {
                console.error(`fallo ${username}:`, error);
                sendResponse({ success: false });
            });
            
        return true; 
    }
});