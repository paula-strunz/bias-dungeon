import { ACCENT_CLASSES, type Avatar, type StatKey } from '../../data/avatars'

interface StatBarsProps {
  avatar: Avatar
}

const STAT_LABELS: Record<StatKey, string> = {
  action: 'Action',
  people: 'People',
  analysis: 'Analysis',
}

export function StatBars({ avatar }: StatBarsProps) {
  const accent = ACCENT_CLASSES[avatar.accent]
  const statEntries = Object.entries(avatar.stats) as [StatKey, number][]

  return (
    <div className="flex w-full flex-col gap-3">
      {statEntries.map(([stat, value]) => (
        <div key={stat} className="grid grid-cols-[72px_1fr] items-center gap-3">
          <span className="font-pixel text-[8px] uppercase tracking-wider text-dungeon-ink/70">
            {STAT_LABELS[stat]}
          </span>
          <div
            className="grid grid-cols-5 gap-1"
            aria-label={`${STAT_LABELS[stat]} ${value} of 5`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={[
                  'h-3 border-2 border-dungeon-ink',
                  index < value ? accent.bg : 'bg-dungeon-ink/10',
                ].join(' ')}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
