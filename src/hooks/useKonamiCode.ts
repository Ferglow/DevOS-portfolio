import { useEffect, useRef, useState } from 'react'

const KONAMI: string[] = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

/**
 * Detecta el código Konami (↑ ↑ ↓ ↓ ← → ← → B A) y devuelve un flag
 * que se activa cuando se completa la secuencia.
 */
export function useKonamiCode(): boolean {
  const [activated, setActivated] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key === KONAMI[indexRef.current].toLowerCase()) {
        indexRef.current += 1
        if (indexRef.current === KONAMI.length) {
          setActivated(true)
          indexRef.current = 0
        }
      } else {
        indexRef.current = key === KONAMI[0].toLowerCase() ? 1 : 0
      }
    }
    globalThis.addEventListener('keydown', onKeyDown)
    return () => globalThis.removeEventListener('keydown', onKeyDown)
  }, [])

  return activated
}
