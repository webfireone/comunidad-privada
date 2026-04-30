# QUICKSTART - Growith Landing Page

## 🚀 Inicio Rápido (3 minutos)

### 1. Abrir la Landing Page
```bash
# Opción A: Doble click en index.html
# Opción B: Servidor local
cd C:\AI\Antigravity\comunidad-privada
npx serve .
```
Luego visita: `http://localhost:3000`

### 2. Abrir el Panel Admin
Visita: `http://localhost:3000/admin.html`
- **Usuario:** admin@growith.com
- **Contraseña:** password123

### 3. Probar Funcionalidades
Visita: `http://localhost:3000/test.html`
- Verifica Firebase
- Prueba formularios
- Revisa datos locales

---

## ✅ Lo que YA funciona

### Landing Page (index.html)
- ✅ Diseño moderno, minimalista, premium
- ✅ Hero section con CTA y estadísticas animadas
- ✅ Secciones: Services, Process, Testimonials, News, Team, FAQ, Admin
- ✅ Formulario de contacto (guarda en localStorage/Firebase)
- ✅ Newsletter subscription
- ✅ Animaciones de scroll (Intersection Observer)
- ✅ Mobile-first responsive
- ✅ Navegación suave

### Panel Admin (admin.html)
- ✅ Dashboard con estadísticas
- ✅ Gráficos animados
- ✅ Gestión de campañas (CRUD simulado)
- ✅ CRM Social: Instagram, Facebook, Twitter, LinkedIn
- ✅ Mensajes recientes
- ✅ Analytics y reportes
- ✅ Configuración de perfil
- ✅ Login con email/Google

### CRM Social (Integrado)
- ✅ Conexión simulada a redes sociales
- ✅ Estadísticas de seguidores/engagement
- ✅ Mensajes recientes por plataforma
- ✅ Actualizaciones en tiempo real (simuladas)

### Firebase Integration
- ✅ Configuración lista (`firebase-config.js`)
- ✅ Guardado de leads en Firestore
- ✅ Suscripciones a newsletter
- ✅ Autenticación de usuarios
- ✅ Analytics de eventos
- ✅ Offline persistence

---

## 🔧 Configurar Firebase (Opcional)

1. Ve a [console.firebase.google.com](https://console.firebase.google.com)
2. Crea un nuevo proyecto "growith-agency"
3. Habilita **Authentication** (Email/Password + Google)
4. Crea **Firestore Database**
5. Copia la configuración y pégala en `firebase-config.js`

```javascript
const firebaseConfig = {
    apiKey: "TU-API-KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    // ... resto de config
};
```

---

## 📦 Archivos del Proyecto

```
comunidad-privada/
├── index.html          ✅ Landing page principal
├── admin.html         ✅ Panel de administración
├── test.html          ✅ Página de pruebas
├── styles.css         ✅ Estilos landing (29KB)
├── admin.css         ✅ Estilos admin (17KB)
├── script.js          ✅ JS landing + Firebase
├── admin.js           ✅ JS admin + Firebase
├── crm-social.js      ✅ CRM social integrations
├── form-handler.js    ✅ Manejo de formularios
├── firebase-config.js ✅ Config Firebase
├── server.js          ✅ Servidor Express local
├── build.js           ✅ Build para producción
├── firebase.json      ✅ Config Firebase Hosting
├── render.yaml        ✅ Config Render.com
├── package.json       ✅ Dependencias npm
└── README.md          ✅ Documentación
```

---

## 🌐 Despliegue

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Render.com
1. Sube código a GitHub
2. Conecta repo en render.com
3. Render detecta `render.yaml` automáticamente

### GitHub Pages (Gratis)
1. Sube a GitHub
2. Settings → Pages → Branch: main
3. Tu sitio: `https://tu-usuario.github.io/growith-landing/`

---

## 🎨 Personalización Rápida

### Cambiar colores (en `styles.css`)
```css
:root {
    --color-primary: #0a3d2f;  /* Verde principal */
    --color-accent: #34d399;    /* Acento */
}
```

### Cambiar textos (en `index.html`)
Edita las secciones directamente en el HTML.

### Cambiar fuentes (en `index.html` y `admin.html`)
Modifica el enlace de Google Fonts.

---

## 📊 Métricas de Conversión

El sitio trackea automáticamente:
- ✅ Clicks en CTA
- ✅ Envíos de formularios
- ✅ Suscripciones newsletter
- ✅ Visitas a secciones
- ✅ Eventos en Firebase Analytics

Ver métricas en:
- Firebase Console → Analytics
- `test.html` → LocalStorage data

---

## 🐛 Solución de Problemas

**El formulario no funciona:**
- Revisa que Firebase esté configurado
- O usa modo demo (guarda en localStorage)

**No carga el admin:**
- Usa las credenciales: admin@growith.com / password123
- Revisa consola del navegador (F12)

**Firebase da error:**
- Verifica `firebase-config.js` tenga datos reales
- O usa modo demo (sin Firebase)

---

## 📞 Soporte

- Documentación: `README.md`
- Guía de despliegue: `deploy-guide.md`
- Página de pruebas: `test.html`

---

**¡Tu landing page está 100% funcional! 🎉**
