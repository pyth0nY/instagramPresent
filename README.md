# instagramPresent
# 📸 Instagram Presence

¡Lleva tu estado de Instagram al siguiente nivel! **Instagram Presence** es una extensión para navegadores que te permite ver lo que estás haciendo en Instagram en tiempo real y, lo más importante, ver la actividad de tus amigos que también la usan.





<img width="342" height="139" alt="image" src="https://github.com/user-attachments/assets/836bd3b4-f2d2-489e-9eb1-1ed6daf00524" />




---

## ✨ Características Principales

-   **Tu Actividad en Vivo:** Muestra tu estado actual en un elegante widget flotante y móvil. ¿Viendo Reels? ¿Explorando? ¿En un DM? ¡Todos lo sabrán!
-   **Presencia de Amigos:** Ve en tiempo real quién de tus amigos (que también tengan la extensión) está conectado y qué está haciendo.
-   **Interfaz Integrada:** Un widget flotante que puedes arrastrar a cualquier parte de la pantalla para que no moleste.
-   **Ligero y Rápido:** Optimizado para no ralentizar tu experiencia en Instagram.
-   **Privado y Seguro:** Tu actividad solo se comparte con otros usuarios de la extensión. No se almacenan datos personales más allá de tu nombre de usuario y tu última actividad.

---

## 🚀 Instalación (Vía Rápida para Amigos)

Como esta extensión aún no está en la Chrome Web Store, la instalación se hace manualmente a través del "Modo de desarrollador". ¡Es muy fácil!

1.  **Descarga el Archivo:** Descarga el archivo `.zip` del proyecto desde la sección de [Releases](https://github.com/pyth0nY/instagramPresent) de este GitHub. <!-- Reemplaza con el enlace a tu repo -->

2.  **Descomprime el Archivo:** Haz clic derecho en el archivo `.zip` descargado y selecciona `Extraer todo...`. Esto creará una carpeta con los archivos de la extensión.

3.  **Abre tu Navegador (Chrome, Brave, etc.):**
    -   Escribe `chrome://extensions` en la barra de direcciones y presiona `Enter`.

4.  **Activa el Modo Desarrollador:**
    -   En la esquina superior derecha, busca y activa el interruptor de **"Modo de desarrollador"**.

     <!-- Reemplaza esto con una captura de cómo activar el modo dev -->

5.  **Carga la Extensión:**
    -   Ahora verás un nuevo botón llamado **"Cargar descomprimida"**. Haz clic en él.
    -   Se abrirá una ventana para seleccionar archivos. **Selecciona la carpeta completa** que descomprimiste en el paso 2. ¡No un archivo individual, la carpeta entera!

6.  **¡Listo!** La extensión "Instagram Presence" aparecerá en tu lista y ya estará funcionando en la web de Instagram. Verás un widget flotante en la esquina inferior derecha.

---

## 🛠️ Cómo Funciona (Stack Tecnológico)

Este proyecto está construido con tecnologías web sencillas y potentes:

-   **JavaScript (Vanilla JS):** Todo el núcleo de la extensión, tanto la lógica como la manipulación de la UI, está hecho con JavaScript puro para un rendimiento máximo.
-   **Supabase:** Usamos Supabase como nuestro backend en tiempo real. Es una alternativa a Firebase que nos proporciona una base de datos PostgreSQL para almacenar y sincronizar los estados de los usuarios al instante.
-   **HTML/CSS:** Para la estructura y los estilos del widget.

El flujo es simple:
1.  El script de lógica (`logic.js`) detecta tu nombre de usuario y tu actividad actual en Instagram.
2.  Envía esta información a una tabla en Supabase.
3.  Al mismo timepo, consulta a Supabase por la actividad reciente de otros usuarios.
4.  El script de la UI (`ui.js`) recibe esta información y dibuja el widget flotante, mostrando tu estado y la lista de amigos activos.

---

## 🤝 Contribuciones

Este es un proyecto personal hecho por diversión. Si tienes ideas para mejorarlo o encuentras algún error, ¡no dudes en abrir un [Issue](https://github.com/tu-usuario/tu-repositorio/issues) en este repositorio!

---

Hecho con ❤️ por [pyth0nY ](https://github.com/pyth0nY) <!-- Pon tu nombre aquí -->
