import { profile } from '../../data/portfolio'
import type { AppComponent } from './types'

const AboutApp: AppComponent = () => {
  return (
    <div className="p-5">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <div
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/20 text-4xl"
          aria-hidden
        >
          {profile.avatarEmoji}
        </div>
        <div>
          <h2 className="font-mono text-xl font-bold text-[var(--color-text)]">{profile.name}</h2>
          <p className="text-sm font-medium text-primary">{profile.role}</p>
          <p className="mt-1 text-xs text-[var(--color-text-dim)]">📍 {profile.locatedIn}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {profile.summary.map((para, i) => (
          <p key={i} className="text-sm leading-relaxed text-[var(--color-text)]">
            {para}
          </p>
        ))}
      </div>
    </div>
  )
}

export default AboutApp
