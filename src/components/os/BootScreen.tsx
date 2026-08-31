import { useEffect, useState } from 'react'
import { useWindowStore } from '../../store/windowStore'

export function BootScreen() {
  const boot = useWindowStore((s) => s.boot)
  const isBooted = useWindowStore((s) => s.isBooted)
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 2200
    let raf = 0

    const tick = (now: number) => {
      const elapsed = now - start
      const p = Math.min(100, (elapsed / duration) * 100)
      setProgress(p)
      if (p < 100) {
        raf = requestAnimationFrame(tick)
      } else {
        setFadeOut(true)
        setTimeout(() => boot(), 300)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [boot])

  if (isBooted) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-desktop transition-opacity duration-300 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden={fadeOut}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/15 text-4xl shadow-lg shadow-primary/20">
        {'>_'}
      </div>
      <h1 className="mt-6 font-mono text-2xl font-bold tracking-wide text-[var(--color-text)]">
        Dev<span className="text-primary">OS</span>
      </h1>
      <p className="mt-1 text-sm text-[var(--color-text-dim)]">Iniciando sistema...</p>

      <div className="mt-6 h-1.5 w-64 overflow-hidden rounded-full bg-[var(--color-border)]">
        <div
          className="boot-bar h-full rounded-full bg-gradient-to-r from-primary to-cyan"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="mt-2 font-mono text-xs text-[var(--color-text-dim)]">
        {Math.round(progress)}%
      </span>
    </div>
  )
}
