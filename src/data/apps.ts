import type { AppDefinition } from './types'

export const appRegistry: AppDefinition[] = [
  {
    id: 'about',
    name: 'Sobre mí',
    icon: '👤',
    defaultSize: { width: 520, height: 420 },
    defaultPosition: { x: 60, y: 40 },
    resizable: true,
    singleton: true,
  },
  {
    id: 'projects',
    name: 'Proyectos',
    icon: '📁',
    defaultSize: { width: 640, height: 480 },
    defaultPosition: { x: 90, y: 60 },
    resizable: true,
    singleton: true,
  },
  {
    id: 'skills',
    name: 'Habilidades',
    icon: '💡',
    defaultSize: { width: 520, height: 440 },
    defaultPosition: { x: 120, y: 80 },
    resizable: true,
    singleton: true,
  },
  {
    id: 'experience',
    name: 'Experiencia',
    icon: '💼',
    defaultSize: { width: 560, height: 460 },
    defaultPosition: { x: 70, y: 70 },
    resizable: true,
    singleton: true,
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: '>_',
    defaultSize: { width: 560, height: 360 },
    defaultPosition: { x: 100, y: 50 },
    resizable: true,
    singleton: true,
  },
  {
    id: 'contact',
    name: 'Contacto',
    icon: '✉️',
    defaultSize: { width: 480, height: 400 },
    defaultPosition: { x: 130, y: 90 },
    resizable: true,
    singleton: true,
  },
]

export type AppId = (typeof appRegistry)[number]['id']

export function getAppDefinition(id: string): AppDefinition | undefined {
  return appRegistry.find((app) => app.id === id)
}
