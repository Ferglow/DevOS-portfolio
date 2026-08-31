import { describe, it, expect } from 'vitest'
import { runCommand, autocomplete, COMMAND_NAMES } from '../terminalCommands'
import { profile, projects, skills } from '../../data/portfolio'

const ctx = { profile, projects, skills }

describe('runCommand', () => {
  it('responde a help con la lista de comandos', () => {
    const res = runCommand('help', ctx)
    expect(res.output.join('\n')).toContain('help')
    expect(res.output.join('\n')).toContain('whoami')
    expect(res.output.join('\n')).toContain('clear')
  })

  it('whoami devuelve el nombre y rol del perfil', () => {
    const res = runCommand('whoami', ctx)
    expect(res.output.join(' ')).toContain(profile.name)
    expect(res.output.join(' ')).toContain(profile.role)
  })

  it('skills devuelve las categorías con tecnologías', () => {
    const res = runCommand('skills', ctx)
    expect(res.output.join('\n')).toContain('frontend')
    expect(res.output.join('\n')).toContain('React')
  })

  it('projects lista los títulos de proyectos', () => {
    const res = runCommand('projects', ctx)
    expect(res.output.join('\n')).toContain(projects[0].title)
  })

  it('cd abre el detalle de un proyecto por id', () => {
    const res = runCommand('cd devos', ctx)
    expect(res.output.join('\n')).toContain('Stack')
  })

  it('cd con proyecto inexistente devuelve error claro', () => {
    const res = runCommand('cd no-existe', ctx)
    expect(res.output[0]).toContain('No se encontró')
  })

  it('echo repite el texto', () => {
    const res = runCommand('echo hola mundo', ctx)
    expect(res.output[0]).toBe('hola mundo')
  })

  it('clear devuelve la marca interna __CLEAR__', () => {
    const res = runCommand('clear', ctx)
    expect(res.output[0]).toBe('__CLEAR__')
  })

  it('comando desconocido devuelve mensaje de error', () => {
    const res = runCommand('hola', ctx)
    expect(res.output[0]).toContain('no reconocido')
  })

  it('input vacío no causa error', () => {
    const res = runCommand('', ctx)
    expect(res.output[0]).toBe('')
  })
})

describe('autocomplete', () => {
  it('completa un prefijo a un comando conocido', () => {
    expect(autocomplete('wh', COMMAND_NAMES)).toBe('whoami')
  })

  it('deja el input igual si no hay coincidencia', () => {
    expect(autocomplete('xyz', COMMAND_NAMES)).toBe('xyz')
  })
})
