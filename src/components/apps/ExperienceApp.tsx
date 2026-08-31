import { experience, education } from '../../data/portfolio'
import type { AppComponent } from './types'

const ExperienceApp: AppComponent = () => {
  return (
    <div className="space-y-6 p-5">
      <section>
        <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-[var(--color-text-dim)]">
          💼 Experiencia
        </h3>
        <div className="space-y-3">
          {experience.map((exp, i) => (
            <div
              key={i}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-window-alt)] p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-semibold text-[var(--color-text)]">{exp.role}</h4>
                <span className="shrink-0 font-mono text-[11px] text-primary-light">
                  {exp.period}
                </span>
              </div>
              <p className="text-sm font-medium text-[var(--color-text-dim)]">{exp.company}</p>
              <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-dim)]">
                {exp.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {exp.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-primary/15 px-2 py-0.5 font-mono text-[10px] text-primary-light"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-[var(--color-text-dim)]">
          🎓 Educación
        </h3>
        <div className="space-y-3">
          {education.map((edu, i) => (
            <div
              key={i}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-window-alt)] p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-semibold text-[var(--color-text)]">{edu.degree}</h4>
                <span className="shrink-0 font-mono text-[11px] text-primary-light">
                  {edu.period}
                </span>
              </div>
              <p className="text-sm font-medium text-[var(--color-text-dim)]">{edu.institution}</p>
              <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-dim)]">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ExperienceApp
