import { useState, type FormEvent } from 'react'
import { profile } from '../../data/portfolio'
import { Mail, Send } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/icons'
import type { AppComponent } from './types'

const ContactApp: AppComponent = () => {
  const [sent, setSent] = useState(false)

  // Este formulario usa mailto como fallback sin backend.
  // Sujeto a personalización: aquí se puede integrar un servicio como Formspree/Web3Forms.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const subject = encodeURIComponent(String(data.get('subject') ?? 'Contacto desde portfolio'))
    const body = encodeURIComponent(
      `Nombre: ${String(data.get('name') ?? '')}\nEmail: ${String(data.get('email') ?? '')}\n\n${String(data.get('message') ?? '')}`,
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="p-5">
      <div className="mb-4 flex items-center gap-2 text-sm text-[var(--color-text)]">
        <Mail size={16} className="text-primary" />
        <span className="font-mono">{profile.email}</span>
      </div>

      <div className="mb-5 flex gap-2">
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-window-alt)] px-3 py-2 text-sm text-[var(--color-text)] transition-colors hover:border-primary/50 hover:text-primary-light"
        >
          <GithubIcon width={16} height={16} /> GitHub
        </a>
        <a
          href={profile.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-window-alt)] px-3 py-2 text-sm text-[var(--color-text)] transition-colors hover:border-primary/50 hover:text-primary-light"
        >
          <LinkedinIcon width={16} height={16} /> LinkedIn
        </a>
      </div>

      {sent ? (
        <div className="rounded-lg border border-success/40 bg-success/10 p-4 text-sm text-success">
          ¡Gracias! Se abrió tu cliente de correo con el mensaje. 
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              name="name"
              type="text"
              required
              placeholder="Tu nombre"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-window-alt)] px-3 py-2 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-dim)] focus:border-primary"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Tu email"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-window-alt)] px-3 py-2 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-dim)] focus:border-primary"
            />
          </div>
          <input
            name="subject"
            type="text"
            placeholder="Asunto"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-window-alt)] px-3 py-2 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-dim)] focus:border-primary"
          />
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Tu mensaje..."
            className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-window-alt)] px-3 py-2 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-dim)] focus:border-primary"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            <Send size={15} /> Enviar mensaje
          </button>
        </form>
      )}
    </div>
  )
}

export default ContactApp
