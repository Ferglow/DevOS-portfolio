import { projects } from '../../data/portfolio'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '../ui/icons'
import type { AppComponent } from './types'

const ProjectsApp: AppComponent = () => {
  return (
    <div className="grid gap-4 p-5 sm:grid-cols-2">
      {projects.map((p) => (
        <article
          key={p.id}
          className="group flex flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-window-alt)] p-4 transition-transform hover:-translate-y-1"
        >
          <div className="flex items-start justify-between">
            <span className="text-3xl" aria-hidden>
              {p.emoji}
            </span>
            <div className="flex gap-2">
              {p.repoUrl && (
                <a
                  href={p.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver código de ${p.title}`}
                  className="text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-text)]"
                >
                  <GithubIcon width={18} height={18} />
                </a>
              )}
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver demo de ${p.title}`}
                  className="text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-text)]"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>

          <h3 className="mt-3 font-semibold" style={{ color: p.accent }}>
            {p.title}
          </h3>
          <p className="mt-1 flex-1 text-xs leading-relaxed text-[var(--color-text-dim)]">
            {p.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.stack.map((tech) => (
              <span
                key={tech}
                className="rounded bg-primary/15 px-2 py-0.5 font-mono text-[10px] text-primary-light"
              >
                {tech}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}

export default ProjectsApp
