# Configuración Manual para Render.com

## Paso 1: Subir código a GitHub
```bash
cd C:\AI\Antigravity\comunidad-privada
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/growith-landing.git
git push -u origin main
```

## Paso 2: Configurar en Render.com (Manual)

1. Ve a https://dashboard.render.com
2. Click en **"New +"** → **"Static Site"**
3. Conecta tu repositorio de GitHub
4. Configura los siguientes campos:

### Configuración exacta:
```
Name: growith-landing
Branch: main
Build Command: (DEJAR VACÍO)
Publish Directory: . (punto)
```

5. Click en **"Create Static Site"**

¡Eso es todo! Render detectará automáticamente que es un sitio estático.

## Verificar despliegue

Una vez desplegado, tu sitio estará en:
- `https://growith-landing.onrender.com`

## Variables de entorno (Opcional)

Si usas Firebase, agrega en "Environment Variables":
```
FIREBASE_API_KEY=tu-api-key
FIREBASE_PROJECT_ID=tu-project-id
```

## Solución de problemas

Si sigue intentando ejecutar `node index.html`:
- Asegúrate de que **Build Command** esté **VACÍO**
- Asegúrate de que **Publish Directory** sea `.` (punto)
- Verifica que NO haya un archivo `render.yaml` en el repo
- Verifica que NO haya un archivo `package.json` con un script `start` que confunda a Render

## Eliminar render.yaml

Si tenías un `render.yaml` problemático, elimínalo:
```bash
git rm render.yaml
git commit -m "Remove render.yaml - use manual config"
git push
```
Luego en Render: Settings → Clear build cache → Manual deploy.
