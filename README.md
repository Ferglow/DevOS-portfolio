# DevOS — Portfolio interactivo

Portfolio personal tipo **sistema operativo**: un escritorio con ventanas arrastrables, terminal interactiva y aplicaciones de contenido (sobre mí, proyectos, habilidades, experiencia, contacto).

Construido desde cero para demostrar arquitectura frontend compleja, motion design y buenas prácticas de ingeniería.

## ✨ Características

- 🖥️ **Sistema de ventanas completo**: drag & drop, redimensionar, maximizar/minimizar/cerrar, gestión de z-index y foco.
- 💻 **Terminal interactiva**: comandos (`help`, `whoami`, `skills`, `projects`, `cd <proyecto>`, `clear`, `matrix`...), historial con flechas y autocompletado con Tab.
- 🔌 **Arquitectura data-driven**: todo el contenido se edita en un solo archivo (`src/data/portfolio.ts`), sin tocar componentes.
- ⏱️ **Boot screen** con barra de progreso real.
- ♿ **Accesible**: respeta `prefers-reduced-motion`, navegación por teclado y etiquetas ARIA.
- 📦 **Code-splitting**: cada aplicación se carga de forma perezosa (mejor rendimiento inicial).
- ✅ **TypeScript estricto**, lint limpio y **tests unitarios** con Vitest.

## 🛠️ Stack

| Capa | Tecnologías |
| --- | --- |
| Core | React 19, TypeScript, Vite |
| UI / Estado | Tailwind CSS, Zustand, Framer Motion |
| Testing | Vitest, Testing Library |

## 🚀 Ejecutar localmente

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## 🧪 Tests

```bash
npm test          # ejecuta todos los tests una vez
npm run test:watch  # modo watch
```

## 📄 Personalización

Todos tus datos personales viven en `src/data/portfolio.ts`:

- `profile` — nombre, rol, resumen, email, redes
- `skills` — habilidades y nivel
- `projects` — proyectos (agrega objetos nuevos y aparecen solos en la UI y la terminal)
- `experience` / `education` — trayectoria

Para cambiar qué aplicaciones existen, edita `src/data/apps.ts`.

## 📁 Estructura

```
src/
├── components/
│   ├── apps/          # Aplicaciones del OS (About, Projects, Terminal...)
│   ├── os/            # Desktop, Taskbar, BootScreen
│   ├── windows/       # WindowFrame (marco de ventana con drag/resize)
│   └── ui/            # Iconos y útiles
├── data/              # Datos de contenido (portfolio, apps, types)
├── lib/               # Lógica pura (motor de comandos de la terminal)
└── store/             # Estado global (window manager con Zustand)
```

## 🔨 Scripts

| Script | Descripción |
| --- | --- |
| `npm run dev` | servidor de desarrollo |
| `npm run build` | build de producción + typecheck |
| `npm run preview` | previsualizar el build |
| `npm test` | ejecutar tests |
| `npm run lint` | linter (oxlint) |

## 📄 Licencia

Uso personal. Siéntete libre de inspirarte.
