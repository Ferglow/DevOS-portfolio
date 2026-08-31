import { describe, it, expect, beforeEach } from 'vitest'
import { useWindowStore } from '../windowStore'

describe('windowStore', () => {
  beforeEach(() => {
    useWindowStore.setState({ windows: {}, focusedId: null, topZ: 10, isBooted: false })
  })

  it('boot inicializa el sistema limpio', () => {
    useWindowStore.getState().boot()
    const s = useWindowStore.getState()
    expect(s.isBooted).toBe(true)
    expect(Object.keys(s.windows)).toHaveLength(0)
  })

  it('openApp crea una ventana y la enfoca', () => {
    useWindowStore.getState().boot()
    useWindowStore.getState().openApp('about')
    const s = useWindowStore.getState()
    const wins = Object.values(s.windows)
    expect(wins).toHaveLength(1)
    expect(wins[0].appId).toBe('about')
    expect(wins[0].isFocused).toBe(true)
  })

  it('apps singleton no se duplican; reutiliza y trae al frente', () => {
    useWindowStore.getState().boot()
    useWindowStore.getState().openApp('about')
    const firstId = Object.values(useWindowStore.getState().windows)[0].id
    useWindowStore.getState().openApp('about')
    const s = useWindowStore.getState()
    expect(Object.keys(s.windows)).toHaveLength(1)
    expect(Object.values(s.windows)[0].id).toBe(firstId)
  })

  it('closeWindow elimina la ventana y actualiza el foco', () => {
    useWindowStore.getState().boot()
    useWindowStore.getState().openApp('about')
    useWindowStore.getState().openApp('skills')
    const s = useWindowStore.getState()
    const ids = Object.values(s.windows).map((w) => w.id)
    const aboutId = ids[0]
    useWindowStore.getState().closeWindow(aboutId)
    const after = useWindowStore.getState()
    expect(after.windows[aboutId]).toBeUndefined()
    expect(after.focusedId).not.toBeNull()
  })

  it('minimize marca la ventana como minimizada y pierde el foco', () => {
    useWindowStore.getState().boot()
    useWindowStore.getState().openApp('contact')
    const id = Object.values(useWindowStore.getState().windows)[0].id
    useWindowStore.getState().minimizeWindow(id)
    const win = useWindowStore.getState().windows[id]
    expect(win.state).toBe('minimized')
    expect(win.isFocused).toBe(false)
  })

  it('moveWindow actualiza posición', () => {
    useWindowStore.getState().boot()
    useWindowStore.getState().openApp('about')
    const id = Object.values(useWindowStore.getState().windows)[0].id
    useWindowStore.getState().moveWindow(id, 500, 300)
    const win = useWindowStore.getState().windows[id]
    expect(win.x).toBe(500)
    expect(win.y).toBe(300)
  })

  it('resizeWindow impone tamaños mínimos', () => {
    useWindowStore.getState().boot()
    useWindowStore.getState().openApp('about')
    const id = Object.values(useWindowStore.getState().windows)[0].id
    useWindowStore.getState().resizeWindow(id, 10, 10)
    const win = useWindowStore.getState().windows[id]
    expect(win.width).toBeGreaterThanOrEqual(300)
    expect(win.height).toBeGreaterThanOrEqual(220)
  })

  it('toggleMaximize alterna el estado maximized', () => {
    useWindowStore.getState().boot()
    useWindowStore.getState().openApp('about')
    const id = Object.values(useWindowStore.getState().windows)[0].id
    useWindowStore.getState().toggleMaximize(id)
    expect(useWindowStore.getState().windows[id].maximized).toBe(true)
    useWindowStore.getState().toggleMaximize(id)
    expect(useWindowStore.getState().windows[id].maximized).toBe(false)
  })
})
