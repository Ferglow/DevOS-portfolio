import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { profile, projects, skills } from '../../data/portfolio'
import {
  COMMAND_NAMES,
  autocomplete,
  runCommand,
  type TerminalContext,
} from '../../lib/terminalCommands'
import { useWindowStore } from '../../store/windowStore'
import type { AppComponent } from './types'

interface Line {
  type: 'input' | 'output' | 'matrix'
  text: string
}

const ctx: TerminalContext = { profile, projects, skills }

const PROMPT = 'usuario@devos:~$'

const TerminalApp: AppComponent = ({ windowId }) => {
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', text: 'DevOS Terminal v1.0' },
    { type: 'output', text: 'Escribe "help" para ver los comandos disponibles.' },
    { type: 'output', text: '' },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIndex, setHistIndex] = useState(-1)
  const [matrixMode, setMatrixMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const closeWindow = useWindowStore((s) => s.closeWindow)
  const openApp = useWindowStore((s) => s.openApp)

  const echo = (text: string, isInput = false) => {
    setLines((prev) => [...prev, { type: isInput ? 'input' : 'output', text }])
  }

  const execute = (value: string) => {
    echo(`${PROMPT} ${value}`, true)
    const result = runCommand(value, ctx)

    for (const out of result.output) {
      if (out === '__CLEAR__') {
        setLines([])
        continue
      }
      if (out === '__MATRIX__') {
        setMatrixMode((m) => !m)
        continue
      }
      if (out === '__CLOSE__') {
        closeWindow(windowId)
        continue
      }
      if (out.startsWith('__OPEN_')) {
        const app = out.slice('__OPEN_'.length, -2)
        openApp(app)
        continue
      }
      if (out === '__KONAMI__') {
        globalThis.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))
      }
      echo(out)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const value = input
      setInput('')
      setHistory((h) => [...h, value])
      setHistIndex(-1)
      execute(value)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const idx = histIndex < 0 ? history.length - 1 : histIndex - 1
      if (idx >= 0) {
        setHistIndex(idx)
        setInput(history[idx])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const idx = histIndex + 1
      if (idx < history.length) {
        setHistIndex(idx)
        setInput(history[idx])
      } else {
        setHistIndex(history.length)
        setInput('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (input.trim()) setInput(autocomplete(input, COMMAND_NAMES))
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 999999, behavior: 'auto' })
  }, [lines, input])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div
      className={`flex h-full flex-col p-3 font-mono text-[13px] leading-relaxed ${
        matrixMode ? 'bg-black text-[#22c55e]' : 'bg-black text-[#e5e7eb]'
      }`}
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto whitespace-pre-wrap">
        {lines.map((line, i) => (
          <div
            key={i}
            className={line.type === 'input' ? 'text-[#a78bfa]' : line.type === 'matrix' ? 'text-[#22c55e]' : ''}
          >
            {line.text}
          </div>
        ))}
        <div className="flex items-center">
          <span className="mr-1 shrink-0 text-[#a78bfa]">{PROMPT}</span>
          <span className="relative flex-1">
            <span className={matrixMode ? 'text-[#22c55e]' : ''}>{input}</span>
            <span className="terminal-cursor absolute">▌</span>
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Entrada de terminal"
            className="pointer-events-none absolute h-0 w-0 opacity-0"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  )
}

export default TerminalApp
