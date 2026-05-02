import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ACCENT_CLASSES, type AccentKey } from '../../data/avatars'

type Variant = 'primary' | 'accent' | 'ghost'

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  accent?: AccentKey
  variant?: Variant
  fullWidth?: boolean
}

export function PixelButton({
  children,
  accent = 'spark',
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...rest
}: PixelButtonProps) {
  const accentClasses = ACCENT_CLASSES[accent]

  const variantClasses =
    variant === 'primary'
      ? `bg-dungeon-parchment text-dungeon-ink hover:bg-white pixel-border`
      : variant === 'accent'
        ? `${accentClasses.bg} ${accentClasses.bgHover} text-dungeon-ink pixel-border`
        : `bg-transparent text-dungeon-parchment border-2 ${accentClasses.border} hover:${accentClasses.bg} hover:text-dungeon-ink`

  return (
    <button
      type="button"
      className={[
        'pixel-press select-none px-5 py-3 font-pixel text-[10px] uppercase tracking-wide sm:text-xs',
        'disabled:cursor-not-allowed disabled:opacity-50',
        fullWidth ? 'w-full' : '',
        variantClasses,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </button>
  )
}
