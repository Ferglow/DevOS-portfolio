import { lazy, Suspense } from 'react'
import { appRegistry } from '../../data/apps'
import { useWindowStore } from '../../store/windowStore'
import { useIsMobile } from '../../hooks/useIsMobile'

const WindowFrame = lazy(() =>
  import('../windows/WindowFrame/WindowFrame').then((m) => ({
    default: m.WindowFrame,
  })),
)

export function Desktop() {
  const windows = useWindowStore((s) => s.windows)
  const openApp = useWindowStore((s) => s.openApp)
  const toggleMaximize = useWindowStore((s) => s.toggleMaximize)
  const isMobile = useIsMobile()

  const openWindows = Object.values(windows).filter((w) => w.state === 'open')

  const handleOpen = (appId: string) => {
    openApp(appId)
    // En móvil, la ventana se abre maximizada para mejor usabilidad
    if (isMobile) {
      const id = useWindowStore.getState().focusedId
      if (id) toggleMaximize(id)
    }
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-desktop">
      {/* Fondo decorativo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan/10 blur-3xl" />
      </div>

      {/* Iconos del escritorio */}
      <div
        className={`absolute z-10 flex gap-4 ${
          isMobile
            ? 'bottom-4 left-0 right-0 justify-around px-2'
            : 'left-4 top-4 flex-col'
        }`}
      >
        {appRegistry.map((app, i) => (
          <button
            key={app.id}
            onClick={() => handleOpen(app.id)}
            style={{ animationDelay: `${150 + i * 80}ms` }}
            className="desktop-icon group flex flex-col items-center gap-1 rounded-lg p-2 text-center transition-colors hover:bg-white/5 focus-visible:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label={`Abrir ${app.name}`}
          >
            <span className="icon-tile flex h-12 w-12 items-center justify-center rounded-lg bg-window-alt text-2xl shadow-md transition-transform group-hover:scale-110 group-active:scale-95">
              <span aria-hidden>{app.icon}</span>
            </span>
            <span className="w-16 text-[11px] leading-tight text-[var(--color-text)] drop-shadow">
              {app.name}
            </span>
          </button>
        ))}
      </div>

      {/* Ventanas abiertas */}
      <Suspense
        fallback={
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-[var(--color-text-dim)]">
            Abriendo...
          </div>
        }
      >
        {openWindows.map((win) => (
          <WindowFrame key={win.id} window={win} />
        ))}
      </Suspense>
    </div>
  )
}
