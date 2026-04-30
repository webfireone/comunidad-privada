# Growith - AI Design Agency Landing Page

Una landing page moderna, minimalista y premium inspirada en diseños de Dribbble para agencias digitales y CRM social.

## Características

- **Diseño Editorial**: Tipografía grande, espacio visual amplio, jerarquía clara
- **Paleta Clean**: Verde oscuro (#0a3d2f), blanco suave, grises elegantes
- **Hero Section Potente**: CTA destacado con estadísticas animadas
- **Navegación Moderna**: Fixed navbar con efecto de scroll
- **Secciones Completas**: Services, Process, Testimonials, News, Team, FAQ, Admin Panel
- **Animaciones Suaves**: Scroll animations, counters, parallax effects
- **Mobile-First**: Diseño responsive completo
- **Estética SaaS**: Profesional, conversión optimizada, visualmente futurista
- **Storytelling + Conversión**: Estructura basada en narrativa persuasiva

## Estructura del Proyecto

```
comunidad-privada/
├── index.html          # Estructura principal
├── styles.css          # Sistema de diseño completo
├── script.js           # Interacciones y animaciones
├── firebase.json       # Configuración Firebase
├── .firebaserc         # Proyecto Firebase
├── render.yaml         # Configuración Render
├── package.json        # Dependencias y scripts
└── README.md          # Documentación
```

## Instalación y Uso

### Local
```bash
# Clonar o descargar archivos
# Abrir index.html en el navegador
# O usar un servidor local:
npx serve .
```

### Firebase Deployment
```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login a Firebase
firebase login

# Inicializar proyecto (si es nuevo)
firebase init hosting

# Editar .firebaserc con tu project ID
# Luego desplegar:
npm run deploy:firebase
```

### Render Deployment
1. Conectar repositorio a Render
2. Render detectará automáticamente `render.yaml`
3. El sitio se desplegará como static site

## Tecnologías

- HTML5 semántico
- CSS3 moderno (Custom Properties, Grid, Flexbox)
- JavaScript vanilla (sin dependencias)
- Google Fonts (Inter, Space Grotesk)
- Intersection Observer API para animaciones
- CSS Animations para efectos visuales

## Personalización

### Colores
Edita las variables en `:root` en `styles.css`:
```css
--color-primary: #0a3d2f;
--color-accent: #34d399;
```

### Contenido
Edita las secciones en `index.html` para cambiar textos, imágenes y enlaces.

### Animaciones
Ajusta los delays y duraciones en `script.js` y `styles.css`.

## Rendimiento

- No dependencies externas (excepto fuentes)
- CSS/JS optimizado
- Lazy loading de animaciones
- Passive event listeners
- Estructura semántica para SEO

## Compatibilidad

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile: ✅
- Fallbacks para navegadores antiguos

## Licencia

MIT - Puedes usar este código libremente para tus proyectos.

---

**Growith** - Transformando el futuro digital con precisión de IA.
