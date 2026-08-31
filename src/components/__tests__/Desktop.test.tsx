import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Desktop } from '../os/Desktop'
import { useWindowStore } from '../../store/windowStore'

describe('Desktop', () => {
  beforeEach(() => {
    useWindowStore.setState({ windows: {}, focusedId: null, topZ: 10, isBooted: true })
  })

  it('renderiza los iconos de las aplicaciones', () => {
    render(<Desktop />)
    expect(screen.getByLabelText('Abrir Sobre mí')).toBeInTheDocument()
    expect(screen.getByLabelText('Abrir Proyectos')).toBeInTheDocument()
    expect(screen.getByLabelText('Abrir Terminal')).toBeInTheDocument()
  })

  it('abre una ventana al hacer clic en un icono', () => {
    render(<Desktop />)
    fireEvent.click(screen.getByLabelText('Abrir Terminal'))
    const state = useWindowStore.getState()
    expect(Object.values(state.windows)).toHaveLength(1)
    expect(Object.values(state.windows)[0].appId).toBe('terminal')
  })

  it('muestra un window-frame dedicado cuando hay una ventana abierta', async () => {
    useWindowStore.getState().openApp('about')
    render(<Desktop />)
    // El WindowFrame se carga de forma perezosa: esperamos su resolución
    const frames = await screen.findAllByTestId('window-frame')
    expect(frames).toHaveLength(1)
  })
})
