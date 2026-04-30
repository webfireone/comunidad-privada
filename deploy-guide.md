# Guía de Despliegue - Growith Landing Page

## Opción 1: Firebase Hosting (Recomendado)

### Paso 1: Instalar Firebase CLI
```bash
npm install -g firebase-tools
```

### Paso 2: Login a Firebase
```bash
firebase login
```

### Paso 3: Inicializar proyecto
```bash
firebase init hosting
```
- Selecciona tu proyecto o crea uno nuevo
- Public directory: `.` (punto)
- Single-page app: `No`
- GitHub integration: Opcional

### Paso 4: Configurar .firebaserc
Edita el archivo `.firebaserc` y reemplaza `your-firebase-project-id` con tu project ID real:
```json
{
  "projects": {
    "default": "growith-landing-xxxx"
  }
}
```

### Paso 5: Desplegar
```bash
firebase deploy
```

Tu sitio estará disponible en: `https://your-project-id.web.app`

---

## Opción 2: Render.com

### Paso 1: Subir a GitHub
```bash
git init
git add .
git commit -m "Initial commit: Growith landing page"
git remote add origin https://github.com/tu-usuario/growith-landing.git
git push -u origin main
```

### Paso 2: Conectar a Render
1. Ve a [render.com](https://render.com)
2. New + → Static Site
3. Conecta tu repositorio de GitHub
4. Configuración:
   - **Build Command**: `echo "No build required"`
   - **Publish Directory**: `.`
5. Click en "Create Static Site"

Render detectará automáticamente el archivo `render.yaml`.

---

## Opción 3: GitHub Pages (Gratis)

### Paso 1: Subir a GitHub (si no lo hiciste)
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/growith-landing.git
git push -u origin main
```

### Paso 2: Habilitar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: `main` branch
4. Folder: `/ (root)`
5. Save

Tu sitio estará en: `https://tu-usuario.github.io/growith-landing/`

---

## Opción 4: Netlify (Muy fácil)

### Método A: Drag & Drop
1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta `comunidad-privada` al área de deploy

### Método B: Conectar GitHub
1. New site from Git
2. Conecta tu repositorio
3. Build command: (dejar vacío)
4. Publish directory: `.`
5. Deploy

---

## Configuración de Firebase para el Panel Admin

Para que el panel admin funcione con Firebase:

### 1. Crear proyecto en Firebase Console
Ve a [console.firebase.google.com](https://console.firebase.google.com)

### 2. Habilitar servicios
- **Authentication**: Email/Password, Google
- **Firestore Database**: Crear base de datos
- **Storage**: Para medios
- **Hosting**: Ya configurado

### 3. Obtener configuración
En Project Settings → General → Your apps → Web app
Copia la configuración y pégala en `firebase-config.js`

### 4. Instalar Firebase SDK en el panel admin
Agrega antes de cerrar `</body>` en `admin.html`:
```html
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-storage-compat.js"></script>
<script src="firebase-config.js"></script>
```

---

## Variables de Entorno (Opcional)

Crea un archivo `.env` para desarrollo:
```
FIREBASE_API_KEY=tu-api-key
FIREBASE_PROJECT_ID=tu-project-id
```

---

## Dominio Personalizado

### Firebase
```bash
firebase hosting:sites:create growith-agency
firebase deploy --only hosting
```
Luego configura DNS en tu proveedor de dominio.

### Render/Netlify
En la configuración del sitio → Custom Domain → Agrega tu dominio.

---

## Monitoreo y Analytics

- **Firebase Analytics**: Automático si inicializaste Analytics
- **Google Analytics**: Agrega el script en `index.html`
- **Hotjar/Clarity**: Para heatmaps y grabaciones de sesiones

---

## Optimización para Producción

1. **Minificar CSS/JS**:
   ```bash
   npm install -g clean-css-cli uglify-js
   cleancss -o styles.min.css styles.css
   uglifyjs script.js -o script.min.js -m
   ```

2. **Optimizar imágenes**: Usa WebP, comprime con TinyPNG

3. **Lazy Loading**: Ya implementado con Intersection Observer

4. **Cache Headers**: Configurados en `firebase.json`

---

¡Tu landing page está lista para el mundo! 🚀
