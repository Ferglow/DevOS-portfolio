import { useEffect, useState } from 'react'
import { getAppDefinition } from '../../data/apps'
import { useWindowStore } from '../../store/windowStore'

function useClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  const date = now.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })

  return { time, date }
}

export function Taskbar() {
  const windows = useWindowStore((s) => s.windows)
  const openApp = useWindowStore((s) => s.openApp)
  const restoreWindow = useWindowStore((s) => s.restoreWindow)
  const focusedId = useWindowStore((s) => s.focusedId)
  const { time, date } = useClock()

  const taskItems = Object.values(windows)

  return (
    <footer className="z-30 flex h-12 shrink-0 items-center gap-2 border-t border-[var(--color-border)] bg-taskbar px-2 backdrop-blur-md">
      {/* Botón Inicio */}
      <button
        onClick={() => openApp('terminal')}
        aria-label="Abrir terminal (Inicio)"
        title="DevOS"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-lg text-white transition-colors hover:bg-primary-dark"
      >
        &gt;_
      </button>

      {/* Programas abiertos */}
      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
        {taskItems.map((win) => {
          const def = getAppDefinition(win.appId)
          const isActive = focusedId === win.id && win.state === 'open'
          return (
            <button
              key={win.id}
              onClick={() =>
                win.state === 'open' ? restoreWindow(win.id) : restoreWindow(win.id)
              }
              aria-label={`${def?.name ?? win.appId}${isActive ? ' (activo)' : ''}`}
              aria-pressed={isActive}
              className={`flex h-8 shrink-0 items-center gap-1.5 rounded-md px-2 text-xs transition-colors ${
                isActive
                  ? 'bg-primary/30 text-[var(--color-text)]'
                  : 'bg-window-alt text-[var(--color-text-dim)] hover:bg-[var(--color-border)]'
              }`}
            >
              <span aria-hidden>{def?.icon}</span>
              <span className="hidden sm:inline">{def?.name ?? win.appId}</span>
            </button>
          )
        })}
        {taskItems.length === 0 && (
          <span className="px-2 text-xs text-[var(--color-text-dim)]">
            Escritorio — haz doble clic en un icono
          </span>
        )}
      </div>

      {/* Reloj */}
      <div className="shrink-0 rounded-md px-2 text-right">
        <div className="font-mono text-[11px] leading-tight text-[var(--color-text)]">{time}</div>
        <div className="text-[10px] leading-tight text-[var(--color-text-dim)]">{date}</div>
      </div>
    </footer>
  )
}
