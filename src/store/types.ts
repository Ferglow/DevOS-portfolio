export type WindowState = 'open' | 'minimized'

export interface ManagedWindow {
  id: string
  appId: string
  state: WindowState
  x: number
  y: number
  width: number
  height: number
  zIndex: number
  maximized: boolean
  isFocused: boolean
}

export interface OpenDefaults {
  x?: number
  y?: number
  width?: number
  height?: number
}

export interface WindowStore {
  windows: Record<string, ManagedWindow>
  focusedId: string | null
  topZ: number
  isBooted: boolean
  boot: () => void
  openApp: (appId: string, defaults?: OpenDefaults) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  focusWindow: (id: string) => void
  toggleMaximize: (id: string) => void
  moveWindow: (id: string, x: number, y: number) => void
  resizeWindow: (id: string, width: number, height: number) => void
}
