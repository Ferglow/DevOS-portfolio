import { lazy, Suspense, type ComponentType } from 'react'
import type { AppComponent, AppProps } from './types'

const AboutApp = lazy(() => import('./AboutApp'))
const ProjectsApp = lazy(() => import('./ProjectsApp'))
const SkillsApp = lazy(() => import('./SkillsApp'))
const ExperienceApp = lazy(() => import('./ExperienceApp'))
const TerminalApp = lazy(() => import('./TerminalApp'))
const ContactApp = lazy(() => import('./ContactApp'))

const registry: Record<string, AppComponent> = {
  about: AboutApp,
  projects: ProjectsApp,
  skills: SkillsApp,
  experience: ExperienceApp,
  terminal: TerminalApp,
  contact: ContactApp,
}

/**
 * Renderiza la app correspondiente a un appId, con lazy-loading.
 * Pasa el windowId para que las apps puedan interactuar con el window manager.
 * Si no existe, muestra un placeholder (evita crash).
 */
export function AppContent({ appId, windowId }: AppProps) {
  const Component: ComponentType<AppProps> | undefined = registry[appId]

  if (!Component) {
    return (
      <div className="m-6 text-sm text-[var(--color-text-dim)]">
        Aplicación &quot;{appId}&quot; no encontrada.
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-40 items-center justify-center text-sm text-[var(--color-text-dim)]">
          Cargando...
        </div>
      }
    >
      <Component appId={appId} windowId={windowId} />
    </Suspense>
  )
}
