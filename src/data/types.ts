export interface Profile {
  name: string
  role: string
  tagline: string
  summary: string[]
  locatedIn: string
  email: string
  avatarEmoji: string
  socials: {
    github: string
    linkedin: string
    blog?: string
  }
}

export interface Skill {
  name: string
  category: SkillCategory
  level: 1 | 2 | 3 | 4 | 5
  icon: string
}

export type SkillCategory = 'frontend' | 'styling' | 'tooling' | 'backend' | 'other'

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  stack: string[]
  repoUrl?: string
  liveUrl?: string
  emoji: string
  accent: string
  highlights: string[]
  category: 'dev' | 'creative' | 'util'
  year: string
  caseStudy?: {
    problem: string
    solution: string
    result: string
    challenge?: string
    techChoice?: string
    keyDecisions?: string[]
  }
}

export interface Experience {
  role: string
  company: string
  period: string
  description: string
  tags: string[]
}

export interface Education {
  degree: string
  institution: string
  period: string
  description: string
}

export interface AppDefinition {
  id: string
  name: string
  icon: string
  defaultSize: { width: number; height: number }
  defaultPosition?: { x: number; y: number }
  resizable: boolean
  singleton: boolean
}
