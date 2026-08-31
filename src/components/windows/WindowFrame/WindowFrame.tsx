import { useRef, useEffect, type PointerEvent } from 'react'
import { X, Minus, Square, Copy } from 'lucide-react'
import { useWindowStore } from '../../../store/windowStore'
import { getAppDefinition } from '../../../data/apps'
import { AppContent } from '../../apps'
import type { ManagedWindow } from '../../../store/types'

interface WindowFrameProps {
  window: ManagedWindow
}

const RESIZE_HANDLE = 8

export function WindowFrame({ window }: WindowFrameProps) {
  const {
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    moveWindow,
    resizeWindow,
  } = useWindowStore()
  const def = getAppDefinition(window.appId)
  const dragStart = useRef<{ x: number; y: number; winX: number; winY: number } | null>(null)

  // Evitar que el contenido sea arrastrable accidentalmente
  const onPointerDown = (e: PointerEvent) => {
    if (e.target !== e.currentTarget) return
    focusWindow(window.id)
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      winX: window.x,
      winY: window.y,
    }
  }

  const onPointerMove = (e: PointerEvent) => {
    if (!dragStart.current || window.maximized) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    moveWindow(window.id, dragStart.current.winX + dx, dragStart.current.winY + dy)
  }

  const onPointerUp = () => {
    dragStart.current = null
  }

  const resizeStart = useRef<{ x: number; y: number; w: number; h: number } | null>(null)

  const onResizeStart = (e: PointerEvent) => {
    e.stopPropagation()
    focusWindow(window.id)
    resizeStart.current = { x: e.clientX, y: e.clientY, w: window.width, h: window.height }
  }

  const onResizeMove = (e: PointerEvent) => {
    if (!resizeStart.current || window.maximized) return
    const dx = e.clientX - resizeStart.current.x
    const dy = e.clientY - resizeStart.current.y
    resizeWindow(window.id, resizeStart.current.w + dx, resizeStart.current.h + dy)
  }

  const onResizeUp = () => {
    resizeStart.current = null
  }

  useEffect(() => {
    const onUp = () => {
      dragStart.current = null
      resizeStart.current = null
    }
    globalThis.addEventListener('pointerup', onUp)
    return () => globalThis.removeEventListener('pointerup', onUp)
  }, [])

  const focusClass = window.isFocused
    ? 'ring-1 ring-primary/40 shadow-2xl shadow-black/60'
    : 'shadow-lg shadow-black/30 opacity-95'

  return (
    <div
      data-testid="window-frame"
      className={`absolute flex flex-col overflow-hidden rounded-lg bg-[var(--color-window)] text-[var(--color-text)] ${focusClass}`}
      style={{
        left: window.x,
        top: window.y,
        width: window.maximized ? '100%' : window.width,
        height: window.maximized ? '100%' : window.height,
        zIndex: window.zIndex,
      }}
      onPointerDown={() => focusWindow(window.id)}
      role="dialog"
      aria-label={def?.name ?? window.appId}
      aria-modal={window.isFocused}
    >
      {/* Barra de título */}
      <div
        className={`flex h-[40px] shrink-0 cursor-grab items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-window-alt)] px-3 active:cursor-grabbing ${
          window.isFocused ? 'text-[var(--color-text)]' : 'text-[var(--color-text-dim)]'
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="text-base" aria-hidden>{def?.icon}</span>
          <span>{def?.name ?? window.appId}</span>
        </div>

        {/* Botones de ventana */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => minimizeWindow(window.id)}
            aria-label="Minimizar"
            title="Minimizar"
            className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--color-text-dim)] transition-colors hover:bg-[var(--color-border)] hover:text-[var(--color-text)]"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={() => toggleMaximize(window.id)}
            aria-label={window.maximized ? 'Restaurar' : 'Maximizar'}
            title={window.maximized ? 'Restaurar' : 'Maximizar'}
            className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--color-text-dim)] transition-colors hover:bg-[var(--color-border)] hover:text-[var(--color-text)]"
          >
            {window.maximized ? <Copy size={14} /> : <Square size={13} />}
          </button>
          <button
            onClick={() => closeWindow(window.id)}
            aria-label="Cerrar"
            title="Cerrar"
            className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-danger)] text-white transition-colors hover:opacity-80"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <AppContent appId={window.appId} windowId={window.id} />
      </div>

      {/* Handle de redimensionar (solo si es redimensionable) */}
      {def?.resizable && !window.maximized && (
        <div
          className="absolute bottom-0 right-0 cursor-se-resize"
          style={{ width: RESIZE_HANDLE * 2, height: RESIZE_HANDLE * 2 }}
          onPointerDown={onResizeStart}
          onPointerMove={onResizeMove}
          onPointerUp={onResizeUp}
          onPointerCancel={onResizeUp}
          role="presentation"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" className="absolute bottom-1 right-1 opacity-40">
            <path d="M14 0 L14 14 L0 14 Z" fill="transparent" />
            <rect x="7" y="7" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <rect x="9.5" y="9.5" width="4.5" height="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      )}
    </div>
  )
}
