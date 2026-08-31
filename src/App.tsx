import { useWindowStore } from './store/windowStore'
import { BootScreen } from './components/os/BootScreen'
import { Desktop } from './components/os/Desktop'
import { Taskbar } from './components/os/Taskbar'

function App() {
  const isBooted = useWindowStore((s) => s.isBooted)

  return (
    <div className="flex h-full flex-col bg-desktop">
      {!isBooted && <BootScreen />}
      <main className="min-h-0 flex-1">
        <Desktop />
      </main>
      <Taskbar />
    </div>
  )
}

export default App
