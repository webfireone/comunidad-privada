# 🟢 Guía de Despliegue en Render.com

## ✅ Lo que YA está hecho:
- ✅ Archivos estáticos (HTML, CSS, JS)
- ✅ No hay `server.js` (eliminado)
- ✅ No hay `render.yaml` (eliminado)
- ✅ `package.json` corregido (sin script `start`)

---

## 🚀 Pasos para DESPLEGAR (Exacto)

### 1. Subir a GitHub
```bash
cd C:\AI\Antigravity\comunidad-privada
git init
git add .
git commit -m "Ready for Render deployment"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/growith-landing.git
git push -u origin main
```

### 2. Conectar a Render
1. Ve a: https://render.com (login)
2. Click **"New +"** → **"Static Site"**
3. Conecta tu cuenta de **GitHub**
4. Selecciona el repo `growith-landing`

### 3. Configuración CRÍTICA (¡ATENCIÓN!)
RENDER REQUIERE ESTOS CAMPOS EXACTOS:

```
Name: growith-landing
Branch: main
Build Command: [DEJAR VACÍO - NO ESCRIBAS NADA]
Publish Directory: .  [pon un punto]
```

**⚠️ IMPORTANTE:**
- **Build Command DEBE estar VACÍO**
- **Publish Directory DEBE ser punto `.`**
- NO pongas `npm install` ni nada en Build Command

### 4. Click en "Create Static Site"

Render tardará ~1-2 minutos en desplegar.

---

## ✅ Verificar despliegue

Una vez terminado, verás:
```
Your site is live at: https://growith-landing.onrender.com
```

Click en la URL y verifica:
- ✅ Landing page carga correctamente
- ✅ CSS carga (estilos aplicados)
- ✅ JS carga (scroll animado, FAQ funciona)
- ✅ Admin panel: https://tu-url.onrender.com/admin.html

---

## ❌ Si da ERROR

### Error: "Cannot find module index.html"
**Solución:** Asegúrate que en Render:
- Build Command = VACÍO
- Publish Directory = `.`

### Error: "Unexpected token '<'"
**Causa:** Render está intentando ejecutar el HTML como JS.
**Solución:** Verifica que NO haya `render.yaml` en el repo. Si existe, elimínalo y haz nuevo push.

### Error: "Command not found: npx"
**Solución:** Build Command debe estar VACÍO.

---

## 🔥 Configuración Manual en Render (Alternativa)

Si la detección automática falla, ve a:
1. Dashboard → Tu sitio → **Settings**
2. Scroll a **"Build & Deploy"**
3. Cambia:
   - **Build Command:** (vacío)
   - **Publish Directory:** `.`
4. Click **"Save Changes"**
5. Click **"Manual Deploy"** → **"Clear cache & deploy"**

---

## 📦 Estructura del Repo (Verificar)

Tu repo DEBE tener:
```
growith-landing/
├── index.html      ✅ (en la raíz)
├── admin.html      ✅
├── styles.css      ✅
├── script.js       ✅
├── admin.js        ✅
├── crm-social.js   ✅
├── form-handler.js ✅
├── admin.css       ✅
├── firebase-config.js ✅
├── package.json    ✅ (solo metadatos)
└── README.md       ✅
```

NO debe tener:
- ❌ `server.js`
- ❌ `render.yaml`
- ❌ `build.js`

---

## 🎉 ¡Listo!

Tu sitio estará en:
- **URL:** `https://growith-landing.onrender.com`
- **Admin:** `https://growith-landing.onrender.com/admin.html`

**Credenciales admin:**
- Email: `admin@growith.com`
- Password: `password123`

---

## 🔗 Enlaces útiles
- Render Docs: https://render.com/docs/static-sites
- Firebase Console: https://console.firebase.google.com
