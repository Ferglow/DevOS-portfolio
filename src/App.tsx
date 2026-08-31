import { useWindowStore } from './store/windowStore'
import { BootScreen } from './components/os/BootScreen'
import { Desktop } from './components/os/Desktop'
import { Taskbar } from './components/os/Taskbar'
import { useKonamiCode } from './hooks/useKonamiCode'

function App() {
  const isBooted = useWindowStore((s) => s.isBooted)
  const konami = useKonamiCode()

  return (
    <div className="relative flex h-full flex-col bg-desktop">
      {!isBooted && <BootScreen />}
      <main className="min-h-0 flex-1">
        <Desktop />
      </main>
      <Taskbar />

      {konami && (
        <div
          className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center pb-24"
          aria-hidden
        >
          <div className="animate-bounce rounded-full border border-primary/50 bg-primary/20 px-5 py-2 font-mono text-sm text-primary-light shadow-lg backdrop-blur">
            🎉 Código Konami activado — ¡Modo developer!
          </div>
        </div>
      )}
    </div>
  )
}

export default App
