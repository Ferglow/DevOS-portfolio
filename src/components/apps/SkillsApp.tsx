import { skills } from '../../data/portfolio'
import type { AppComponent } from './types'

const categoryLabel: Record<string, string> = {
  frontend: 'Frontend',
  styling: 'Estilos / UI',
  tooling: 'Herramientas',
  backend: 'Backend',
  other: 'Otros',
}

const categoryOrder = ['frontend', 'styling', 'tooling', 'other', 'backend']

const SkillsApp: AppComponent = () => {
  const grouped = categoryOrder
    .map((cat) => ({
      cat,
      label: categoryLabel[cat] ?? cat,
      items: skills.filter((s) => s.category === cat),
    }))
    .filter((g) => g.items.length > 0)

  return (
    <div className="space-y-5 p-5">
      {grouped.map((group) => (
        <section key={group.cat}>
          <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-[var(--color-text-dim)]">
            {group.label}
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {group.items.map((skill) => (
              <div
                key={skill.name}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-window-alt)] p-2.5"
              >
                <div className="flex items-center gap-2 text-sm text-[var(--color-text)]">
                  <span aria-hidden>{skill.icon}</span>
                  <span className="truncate font-medium">{skill.name}</span>
                </div>
                <div className="mt-2 flex gap-1" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 flex-1 rounded-full ${
                        i < skill.level ? 'bg-primary' : 'bg-[var(--color-border)]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default SkillsApp
