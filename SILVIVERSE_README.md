# ✨ SilviVerse - Un Universo Digital de Amor y Recuerdos

> **SilviVerse** es una aplicación web romántica, interactiva y emotivamente expresiva diseñada como un **museo digital de recuerdos, emociones, cartas secretas y flores interactivas**.

## 🌹 Descripción

SilviVerse es un espacio mágico dedicado a alguien especial llamado **Silvi**. La aplicación permite:

- 📝 **Guardar recuerdos** con poemas y detalles especiales
- 💭 **Expresar sensaciones** en notas emotivas
- 💌 **Escribir cartas secretas** con ciframiento emocional
- 🌹 **Cultivar un jardín interactivo** de flores animadas
- 📊 **Rastrear estadísticas** personales de actividad
- 🎉 **Enviar ramos especiales** con animaciones mágicas

## 🚀 Características Principales

### 🏠 Página de Inicio
- Héroe animado con partículas flotantes
- Navegación elegante a todas las secciones
- Presentación romántica de la marca

### 📝 Recuerdos (Galería)
- Galería tipo masonry de recuerdos
- Cada recuerdo tiene: título, poema, fecha, tags
- **Exportar como PNG** usando html2canvas
- Animaciones suaves al pasar el ratón
- Estilos polaroid

### 💭 Sensaciones (Emociones)
- Crear notas de emociones cortas
- Selector de emojis
- Generador de frases románticas aleatorias
- Animaciones al crear

### 💌 Cartas Secretas
- Editor de cartas con textarea
- Botón "Revelar" con animación typewriter
- **Contraseña especial**: si escribes **"silvi"**, se revela un mensaje secreto
- Animación de corazones flotantes al revelar secreto
- Almacenamiento persistente

### 🌹 Jardín de Flores
- Canvas interactivo donde hacer clic para plantar flores
- Selector de tipo de flor (🌹🌷🌼🌸)
- Envío de ramos con efectos especiales
- Historial de ramos enviados
- Animaciones de crecimiento y desvanecimiento

### ✨ Sistema de Partículas
- Partículas flotantes en transiciones
- Efectos de corazones, estrellas, flores y chispas
- Sistema reutilizable en toda la app

### 🎐 Superposición de Bienvenida
- Se muestra solo la primera vez
- Animación fade suave
- Botones para explorar o saltar
- Flag guardado en LocalStorage

### 📱 Experiencia Móvil
- Diseño mobile-first
- Navegación inferior en móviles
- Áreas de toque grandes y responsivas
- Scroll suave

### ⌨️ Atajos de Teclado
- `Ctrl + 1`: Ir a inicio
- `Ctrl + 2`: Ir a Recuerdos
- `Ctrl + 3`: Ir a Sensaciones
- `Ctrl + 4`: Ir a Cartas
- `Ctrl + 5`: Ir a Flores
- `Ctrl + K`: Búsqueda rápida (funcionalidad futura)
- `Ctrl + S`: Guardar contexto

## 🎨 Paleta de Colores

```
#FFE4EF - Rosa pastel primario
#EDE0FF - Púrpura pastel
#DFF7EA - Verde menta
#FFF7F3 - Crema claro
#F5E6D3 - Caramelo cálido
```

Gradientes románticos:
- Rosa → Púrpura → Rosa
- Ámbar → Naranja → Rosa
- Verde → Esmeralda → Turquesa

## 💾 Persistencia de Datos

Todo se guarda en **LocalStorage**:
- ✅ Recuerdos
- ✅ Sensaciones
- ✅ Cartas
- ✅ Ramos de flores
- ✅ Estadísticas de visitas
- ✅ Flag de bienvenida

```typescript
// Estructura de almacenamiento:
silviverse_welcome_seen     // boolean
silviverse_memories         // Memory[]
silviverse_feelings         // Feeling[]
silviverse_letters          // Letter[]
silviverse_bouquets         // Bouquet[]
silviverse_statistics       // Statistics
```

## 📊 Sistema de Estadísticas

Rastreo automático de:
- Número de visitas
- Cartas escritas
- Flores enviadas
- Sensaciones creadas
- Recuerdos guardados
- Última visita

## 🛠 Tech Stack

- **Framework**: Next.js 16 con App Router
- **UI**: React 19
- **Styling**: TailwindCSS v4
- **Animaciones**: Framer Motion
- **Exportación**: html2canvas
- **Lenguaje**: TypeScript
- **Persistencia**: LocalStorage
- **Fuentes**: Playfair Display (títulos) + Crimson Text (serif)

## 📁 Estructura del Proyecto

```
verse/
├── app/
│   ├── layout.tsx          # Layout raíz
│   ├── page.tsx            # Página de inicio
│   ├── globals.css         # Estilos globales
│   ├── recuerdos/
│   │   └── page.tsx        # Galería de recuerdos
│   ├── sensaciones/
│   │   └── page.tsx        # Página de sensaciones
│   ├── cartas/
│   │   └── page.tsx        # Cartas secretas
│   └── flores/
│       └── page.tsx        # Jardín de flores
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── WelcomeOverlay.tsx
│   │   ├── ParticleSystem.tsx
│   │   ├── MemoryCard.tsx
│   │   ├── FeelingCard.tsx
│   │   ├── LetterDisplay.tsx
│   │   ├── Flower.tsx
│   │   ├── ToastNotifications.tsx
│   │   ├── KeyboardShortcuts.tsx
│   │   └── RootLayoutClient.tsx
│   ├── types/
│   │   └── index.ts        # Tipos TypeScript
│   ├── utils/
│   │   ├── storage.ts      # Funciones LocalStorage
│   │   └── helpers.ts      # Utilidades
│   ├── hooks/
│   │   └── useStatistics.ts
│   └── data/
│       └── sample.ts       # Datos de muestra
├── tsconfig.json
├── package.json
└── README.md
```

## 🚀 Instalación y Ejecución

### Instalación

```bash
# Clonar o navegar al proyecto
cd verse

# Instalar dependencias
pnpm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
pnpm run dev

# Abre http://localhost:3000 (o 3001 si 3000 está ocupado)
```

### Construcción y Producción

```bash
# Construir para producción
pnpm run build

# Iniciar servidor de producción
pnpm start
```

## 🎯 Cómo Usar

### 1️⃣ Bienvenida
Al primera acceso, verás una bonita superposición de bienvenida. Haz clic en "Explorar" para continuar.

### 2️⃣ Recuerdos
- Haz clic en "Nuevo Recuerdo"
- Ingresa título, poema y etiquetas
- Guarda y verás tu recuerdo en la galería
- Pasa el ratón y haz clic en "Guardar" para descargar como PNG

### 3️⃣ Sensaciones
- Escribe en el textarea
- Selecciona un emoji
- Haz clic en "Guardar Sensación"
- O usa "Frase Romántica" para inspiración

### 4️⃣ Cartas Secretas
- Escribe tu carta
- Opcionalmente, ingresa una contraseña
- 💡 Pista: la contraseña mágica es "silvi"
- Haz clic en "Revelar" para ver la carta
- Si usas la contraseña correcta, ¡verás un mensaje especial! ✨

### 5️⃣ Flores
- Selecciona un tipo de flor
- Haz clic en el jardín para plantar
- O envía ramos prediseñados
- Ve el historial de ramos enviados

## 🎨 Personalización

### Cambiar la Contraseña Secreta
En `app/cartas/page.tsx`, línea ~80:
```typescript
const isSecret = password.toLowerCase() === 'tu-contraseña-aquí';
```

### Agregar Emojis de Sensaciones
En `app/sensaciones/page.tsx`:
```typescript
const emojis = ['💭', '💗', '💫', '🌙', '✨',  /* ... agregar más */];
```

### Cambiar la Paleta de Colores
En `app/globals.css`:
```css
:root {
  --color-rose-primary: #FFE4EF;
  --color-purple-primary: #EDE0FF;
  /* ... etc */
}
```

## 💝 Características Especiales

### 🔓 Secreto Oculto
Escribe una carta con la contraseña **"silvi"** para revelar un mensaje de amor especial con animación de corazones flotantes.

### 📸 Exportar Recuerdos
Cada recuerdo puede ser exportado como una bonita imagen PNG del tamaño de una tarjeta. Perfecta para compartir.

### 📱 Responsive
La aplicación se ve hermosa en:
- 📱 Teléfonos móviles (320px+)
- 💻 Tabletas (768px+)
- 🖥️ Desktops (1024px+)

### 🌙 Modo Oscuro
Soporta automáticamente el modo claro/oscuro del sistema con estilos optimizados para ambos.

## 🚦 Notificaciones

La app incluye un sistema de notificaciones toast para:
- Confirmación de guardado
- Errores
- Acciones especiales
- Atajos de teclado

## ⌚ Rastreo de Actividad

Automáticamente se registran:
- Cada visita
- Cada recuerdo creado
- Cada sensación guardada
- Cada carta escrita
- Cada flor enviada

Accesible en futuras actualizaciones para mostrar estadísticas.

## 🐛 Solución de Problemas

### LocalStorage lleno
Borra los datos obsoletos desde la consola del navegador:
```javascript
localStorage.clear();
```

### Datos no se guardan
Verifica que el navegador permita LocalStorage y que no estés en modo privado.

### Puerto 3000 ocupado
El dev server usará automáticamente el puerto 3001 si 3000 está en uso.

## 📝 TiposScript

Todos los componentes están completamente tipados:
- `Memory` - Estructura de recuerdos
- `Feeling` - Emociones
- `Letter` - Cartas
- `Bouquet` - Ramos
- `Particle` - Sistema de partículas
- `Statistics` - Estadísticas

## 🎬 Animaciones

Animaciones suaves usando Framer Motion:
- Transiciones fade
- Escalas y rotaciones
- Movimientos flotantes
- Anim aciones de resorte
- Partículas que caen

## 🌐 Compatibilidad

- ✅ Chrome/Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Mobile browsers

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo licencia MIT.

## 💌 Créditos

Creado con ❤️ como un tributo a alguien especial llamada Silvi.

Un universo digital lleno de recuerdos, emociones y amor infinito.

---

**Haz que cada momento cuente. Cada recuerdo es eterno.** ✨🌹💕

```
✨ SilviVerse ✨
Un lugar donde el amor y los recuerdos viven para siempre
```
