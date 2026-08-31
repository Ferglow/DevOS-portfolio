import { create } from 'zustand'
import type { ManagedWindow, WindowStore } from './types'
import { getAppDefinition } from '../data/apps'

const CASCADE_STEP = 28

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: {},
  focusedId: null,
  topZ: 10,
  isBooted: false,

  boot: () =>
    set(() => ({
      isBooted: true,
      topZ: 10,
      focusedId: null,
      windows: {},
    })),

  openApp: (appId, defaults) => {
    const { windows, topZ } = get()

    // Si la app es singleton y ya está abierta, la traemos al frente
    const existing = Object.values(windows).find((w) => w.appId === appId)
    const def = getAppDefinition(appId)
    if (existing && def?.singleton) {
      const newZ = topZ + 1
      const updated: ManagedWindow = { ...existing, zIndex: newZ, state: 'open', isFocused: true }
      const next = { ...windows, [existing.id]: updated }
      const reFocused = Object.fromEntries(
        Object.entries(next).map(([k, v]) => [k, { ...v, isFocused: k === existing.id }]),
      )
      set({ windows: reFocused, topZ: newZ, focusedId: existing.id })
      return
    }

    const baseSize = def ? def.defaultSize : { width: 480, height: 400 }
    const openCount = Object.values(windows).length
    const cascade = openCount * CASCADE_STEP

    const win: ManagedWindow = {
      id: `${appId}-${Date.now()}`,
      appId,
      state: 'open',
      x: defaults?.x ?? 80 + cascade,
      y: defaults?.y ?? 40 + cascade,
      width: defaults?.width ?? baseSize.width,
      height: defaults?.height ?? baseSize.height,
      zIndex: topZ + 1,
      maximized: false,
      isFocused: true,
    }

    set((state) => {
      const next = { ...state.windows, [win.id]: win }
      const reFocused = Object.fromEntries(
        Object.entries(next).map(([k, v]) => [k, { ...v, isFocused: k === win.id }]),
      )
      return { windows: reFocused, topZ: win.zIndex, focusedId: win.id }
    })
  },

  closeWindow: (id) =>
    set((state) => {
      const { [id]: _removed, ...rest } = state.windows
      const remaining = Object.values(rest)
      const nextFocused = remaining
        .filter((w) => w.state === 'open')
        .sort((a, b) => b.zIndex - a.zIndex)[0]
      return {
        windows: rest,
        focusedId: nextFocused ? nextFocused.id : null,
      }
    }),

  minimizeWindow: (id) =>
    set((state) => {
      const win = state.windows[id]
      if (!win) return {}
      const updated: ManagedWindow = { ...win, state: 'minimized', isFocused: false }
      const next = { ...state.windows, [id]: updated }
      const nextFocused = Object.values(next)
        .filter((w) => w.state === 'open' && w.id !== id)
        .sort((a, b) => b.zIndex - a.zIndex)[0]
      return { windows: next, focusedId: nextFocused ? nextFocused.id : null }
    }),

  restoreWindow: (id) =>
    set((state) => {
      const win = state.windows[id]
      if (!win) return {}
      const updated: ManagedWindow = { ...win, state: 'open' }
      return { windows: { ...state.windows, [id]: updated } }
    }),

  focusWindow: (id) =>
    set((state) => {
      const win = state.windows[id]
      if (!win) return {}
      const newZ = state.topZ + 1
      const updated: ManagedWindow = { ...win, isFocused: true, zIndex: newZ, state: 'open' }
      const next = { ...state.windows, [id]: updated }
      const reFocused = Object.fromEntries(
        Object.entries(next).map(([k, v]) => [k, { ...v, isFocused: k === id }]),
      )
      return { windows: reFocused, topZ: newZ, focusedId: id }
    }),

  toggleMaximize: (id) =>
    set((state) => {
      const win = state.windows[id]
      if (!win) return {}
      const updated: ManagedWindow = { ...win, maximized: !win.maximized }
      return { windows: { ...state.windows, [id]: updated } }
    }),

  moveWindow: (id, x, y) =>
    set((state) => {
      const win = state.windows[id]
      if (!win) return {}
      return { windows: { ...state.windows, [id]: { ...win, x, y } } }
    }),

  resizeWindow: (id, width, height) =>
    set((state) => {
      const win = state.windows[id]
      if (!win) return {}
      return {
        windows: {
          ...state.windows,
          [id]: { ...win, width: Math.max(300, width), height: Math.max(220, height) },
        },
      }
    }),
}))
