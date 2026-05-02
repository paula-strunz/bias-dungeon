import type { HTMLAttributes, ReactNode } from 'react'

interface PixelCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'parchment' | 'dark'
}

export function PixelCard({
  children,
  variant = 'parchment',
  className = '',
  ...rest
}: PixelCardProps) {
  const variantClasses =
    variant === 'parchment'
      ? 'bg-dungeon-parchment text-dungeon-ink pixel-border-parchment pixel-inset'
      : 'bg-dungeon-ink text-dungeon-parchment pixel-border'

  return (
    <div
      className={[
        'relative w-full max-w-2xl px-6 py-6 font-body sm:px-8 sm:py-8',
        variantClasses,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
}
