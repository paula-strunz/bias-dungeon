import { ACCENT_CLASSES, type AccentKey } from '../../data/avatars'

interface ProgressBarProps {
  current: number
  total: number
  accent?: AccentKey
  label?: string
}

export function ProgressBar({
  current,
  total,
  accent = 'spark',
  label,
}: ProgressBarProps) {
  const safeTotal = Math.max(total, 1)
  const safeCurrent = Math.min(Math.max(current, 0), safeTotal)
  const percent = (safeCurrent / safeTotal) * 100
  const fillBg = ACCENT_CLASSES[accent].bg

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-2 flex items-center justify-between font-pixel text-[9px] uppercase tracking-wider text-dungeon-parchmentDark sm:text-[10px]">
        <span>{label ?? `Room ${safeCurrent} of ${safeTotal}`}</span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div
        className="h-3 w-full border-2 border-dungeon-parchment bg-dungeon-ink"
        role="progressbar"
        aria-valuenow={safeCurrent}
        aria-valuemin={0}
        aria-valuemax={safeTotal}
        aria-label={label ?? `Room ${safeCurrent} of ${safeTotal}`}
      >
        <div
          className={`h-full ${fillBg} transition-[width] duration-500 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
