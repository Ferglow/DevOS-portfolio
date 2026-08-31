import { useEffect, useState } from 'react'

const MOBILE_QUERY = '(max-width: 640px)'

function isMobileViewport(): boolean {
  if (typeof globalThis === 'undefined') return false
  if (typeof globalThis.matchMedia !== 'function') {
    // Fallback (ej. jsdom): usar el ancho de la ventana
    return (globalThis as { innerWidth?: number }).innerWidth !== undefined
      ? (globalThis as { innerWidth: number }).innerWidth <= 640
      : false
  }
  return globalThis.matchMedia(MOBILE_QUERY).matches
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(isMobileViewport)

  useEffect(() => {
    if (typeof globalThis === 'undefined') return
    if (typeof globalThis.matchMedia !== 'function') return
    const mq = globalThis.matchMedia(MOBILE_QUERY)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return isMobile
}
