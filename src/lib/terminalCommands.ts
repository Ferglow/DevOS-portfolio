import type { Profile, Project, Skill } from '../data/types'

export interface TerminalContext {
  profile: Profile
  projects: Project[]
  skills: Skill[]
}

export interface CommandResult {
  output: string[]
}

/**
 * Motor de comandos de la terminal.
 * Cada comando devuelve líneas de texto. Es puro y testeable
 * (no depende del DOM), lo que permite hacer unit tests.
 */
export function runCommand(input: string, ctx: TerminalContext): CommandResult {
  const raw = input.trim()
  const [cmd, ...args] = raw.split(/\s+/)
  const lower = (cmd ?? '').toLowerCase()

  switch (lower) {
    case '':
      return { output: [''] }

    case 'help':
      return {
        output: [
          'Comandos disponibles:',
          '  help        Muestra esta ayuda',
          '  whoami      Información sobre mí',
          '  skills      Lista de habilidades',
          '  projects    Lista de proyectos',
          '  cd <proyecto>  Detalle de un proyecto',
          '  clear       Limpia la terminal',
          '  echo <texto>   Repite un texto',
          '  matrix      Modo matrix 🟢',
          '  exit        Cierra la terminal',
          '  about       Sobre el DevOS',
        ],
      }

    case 'whoami': {
      const lines = [
        `${ctx.profile.name} — ${ctx.profile.role}`,
        ctx.profile.tagline,
        `Ubicación: ${ctx.profile.locatedIn}`,
      ]
      return { output: lines }
    }

    case 'skills': {
      const grouped = new Map<string, Skill[]>()
      for (const s of ctx.skills) {
        const list = grouped.get(s.category) ?? []
        list.push(s)
        grouped.set(s.category, list)
      }
      const lines: string[] = []
      for (const [cat, list] of grouped) {
        lines.push(`${cat}: ${list.map((s) => s.name).join(', ')}`)
      }
      return { output: lines }
    }

    case 'projects': {
      const lines = ctx.projects.map((p) => `${p.emoji} ${p.title} (${p.year}) — ${p.description}`)
      if (lines.length === 0) lines.push('No hay proyectos todavía.')
      return { output: lines }
    }

    case 'cd': {
      if (args.length === 0) {
        return { output: ['Uso: cd <id-or-title>. Prueba: cd devos'] }
      }
      const target = args.join(' ').toLowerCase()
      const proj = ctx.projects.find(
        (p) => p.id.toLowerCase() === target || p.title.toLowerCase() === target,
      )
      if (!proj) {
        return { output: [`No se encontró el proyecto "${args.join(' ')}". Uso: cd <id>.`] }
      }
      const lines = [
        `📂 ${proj.title} (${proj.year})`,
        proj.longDescription,
        '',
        `Stack: ${proj.stack.join(', ')}`,
        ...(proj.repoUrl ? [`Repo: ${proj.repoUrl}`] : []),
        ...(proj.liveUrl ? [`Demo: ${proj.liveUrl}`] : []),
      ]
      return { output: lines }
    }

    case 'clear':
      return { output: ['__CLEAR__'] }

    case 'echo':
      return { output: [args.join(' ') || ''] }

    case 'matrix':
      return { output: ['__MATRIX__', 'Iniciando modo matrix... (usa "matrix off" para salir)'] }

    case 'about':
      return {
        output: [
          'DevOS v1.0',
          'Un portfolio interactivo tipo sistema operativo.',
          'Stack: React 19, TypeScript, Vite, Tailwind CSS, Zustand, Framer Motion.',
        ],
      }

    case 'exit':
      return { output: ['__CLOSE__', 'Terminal cerrada.'] }

    default:
      return { output: [`Comando no reconocido: "${cmd}". Escribe "help" para ver los comandos.`] }
  }
}

/**
 * Auto-completado: devuelve la primer coincidencia de comando.*
 */
export function autocomplete(input: string, commands: string[]): string {
  const trimmed = input.trim()
  if (!trimmed) return input
  const match = commands.find((c) => c.startsWith(trimmed.toLowerCase()))
  return match ? match : input
}

export const COMMAND_NAMES = [
  'help',
  'whoami',
  'skills',
  'projects',
  'cd',
  'clear',
  'echo',
  'matrix',
  'about',
  'exit',
]
