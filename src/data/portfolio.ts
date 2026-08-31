import type { Experience, Profile, Project, Skill, Education } from './types'

export const profile: Profile = {
  name: 'Tu Nombre',
  role: 'Desarrollador Frontend',
  tagline: 'Convierto ideas en interfaces web fluidas, accesibles y con personalidad.',
  summary: [
    'Desarrollador frontend apasionado por crear experiencias web interactivas y memorables. Me especializo en React, TypeScript y diseño de interfaces.',
    'Creo que el código bien hecho es una forma de arte: cada proyecto es una oportunidad para combinar lógica sólida con estética cuidada.',
  ],
  locatedIn: 'Tu Ciudad, País',
  email: 'tu@email.com',
  avatarEmoji: '👨‍💻',
  socials: {
    github: 'https://github.com/tu-usuario',
    linkedin: 'https://linkedin.com/in/tu-usuario',
  },
}

export const skills: Skill[] = [
  { name: 'React', category: 'frontend', level: 5, icon: '⚛️' },
  { name: 'TypeScript', category: 'frontend', level: 4, icon: '🔷' },
  { name: 'JavaScript (ES6+)', category: 'frontend', level: 5, icon: '🟨' },
  { name: 'HTML5', category: 'frontend', level: 5, icon: '🧱' },
  { name: 'CSS3 / Flexbox / Grid', category: 'styling', level: 4, icon: '🎨' },
  { name: 'Tailwind CSS', category: 'styling', level: 4, icon: '🌊' },
  { name: 'Framer Motion', category: 'styling', level: 3, icon: '✨' },
  { name: 'Vite', category: 'tooling', level: 4, icon: '⚡' },
  { name: 'Git / GitHub', category: 'tooling', level: 4, icon: '🌿' },
  { name: 'NPM', category: 'tooling', level: 4, icon: '📦' },
  { name: 'REST APIs', category: 'other', level: 4, icon: '🔌' },
  { name: 'Zustand', category: 'other', level: 3, icon: '🐻' },
]

export const projects: Project[] = [
  {
    id: 'devos',
    title: 'DevOS Portfolio',
    description: 'Este mismo portfolio: un sistema operativo interactivo construido con React.',
    longDescription:
      'Un portfolio que se comporta como un sistema operativo: ventanas arrastrables, terminal interactivo y escritorio navegable. Construido desde cero para demostrar arquitectura frontend compleja.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Zustand', 'Framer Motion'],
    emoji: '🖥️',
    accent: '#a78bfa',
    highlights: [
      'Window manager con drag & drop y z-index',
      'Terminal interactiva con comandos',
      'Arquitectura data-driven',
      '100% responsive y accesible',
    ],
    category: 'dev',
    year: '2026',
  },
]

export const experience: Experience[] = [
  {
    role: 'Desarrollador Frontend',
    company: 'Tu Empresa / Freelance',
    period: '2024 — Presente',
    description:
      'Desarrollo de interfaces web con React, TypeScript y consumo de APIs RESTful. Colaboración en equipos ágiles y entrega de código de calidad con pruebas unitarias.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Agile'],
  },
]

export const education: Education[] = [
  {
    degree: 'Desarrollo Web / Autodidacta',
    institution: 'Formación en línea',
    period: 'Continuo',
    description:
      'Formación continua en desarrollo frontend, arquitectura de software y diseño de interfaces.',
  },
]
