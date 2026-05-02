import type { Avatar } from '../../data/avatars'

interface PixelCharacterProps {
  avatar: Avatar
  size?: 'sm' | 'md' | 'lg'
  label?: string
  className?: string
}

const sizeClasses = {
  sm: 'h-14 w-12',
  md: 'h-20 w-16',
  lg: 'h-28 w-24',
}

function block(className: string, color: string) {
  return (
    <div
      className={`absolute border-2 border-dungeon-ink ${className}`}
      style={{ backgroundColor: color }}
    />
  )
}

function fill(className: string, color: string) {
  return (
    <div
      className={`absolute ${className}`}
      style={{ backgroundColor: color }}
    />
  )
}

export function PixelCharacter({
  avatar,
  size = 'md',
  label,
  className = '',
}: PixelCharacterProps) {
  const decorative = !label
  const { sprite, spriteStyle } = avatar

  const armClasses = {
    ready: {
      left: 'left-[8%] top-[43%] h-[23%] w-[16%]',
      right: 'right-[9%] top-[39%] h-[22%] w-[16%]',
    },
    lively: {
      left: 'left-[6%] top-[29%] h-[25%] w-[16%]',
      right: 'right-[5%] top-[45%] h-[21%] w-[16%]',
    },
    steady: {
      left: 'left-[10%] top-[43%] h-[25%] w-[16%]',
      right: 'right-[10%] top-[43%] h-[25%] w-[16%]',
    },
    focused: {
      left: 'left-[12%] top-[43%] h-[23%] w-[15%]',
      right: 'right-[12%] top-[43%] h-[23%] w-[15%]',
    },
  }[spriteStyle.stance]

  const legClasses = {
    ready: {
      left: 'bottom-0 left-[21%] h-[28%] w-[18%]',
      right: 'bottom-[3%] right-[21%] h-[27%] w-[18%]',
    },
    lively: {
      left: 'bottom-0 left-[23%] h-[27%] w-[17%]',
      right: 'bottom-0 right-[21%] h-[27%] w-[17%]',
    },
    steady: {
      left: 'bottom-0 left-[20%] h-[26%] w-[19%]',
      right: 'bottom-0 right-[20%] h-[26%] w-[19%]',
    },
    focused: {
      left: 'bottom-0 left-[25%] h-[28%] w-[17%]',
      right: 'bottom-0 right-[25%] h-[28%] w-[17%]',
    },
  }[spriteStyle.stance]

  return (
    <div
      className={[
        'relative shrink-0 [image-rendering:pixelated]',
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role={decorative ? undefined : 'img'}
      aria-label={label}
      aria-hidden={decorative}
    >
      {spriteStyle.outfit === 'utility-cloak' &&
        block('left-[16%] top-[28%] h-[48%] w-[68%]', sprite.accessory)}

      {block('left-[29%] top-[8%] h-[29%] w-[42%]', sprite.skin)}

      {spriteStyle.hair === 'side-sweep' && (
        <>
          {block('left-[23%] top-[3%] h-[12%] w-[54%]', sprite.hair)}
          {block('left-[21%] top-[13%] h-[10%] w-[22%]', sprite.hair)}
          {fill('left-[21%] top-[16%] h-[5%] w-[58%]', sprite.accessory)}
          {fill('right-[13%] top-[16%] h-[8%] w-[12%]', sprite.accessory)}
        </>
      )}

      {spriteStyle.hair === 'fluffy' && (
        <>
          {block('left-[18%] top-[1%] h-[15%] w-[64%]', sprite.hair)}
          {block('left-[13%] top-[9%] h-[13%] w-[18%]', sprite.hair)}
          {block('right-[13%] top-[9%] h-[13%] w-[18%]', sprite.hair)}
          {block('left-[31%] top-0 h-[10%] w-[16%]', sprite.hair)}
        </>
      )}

      {spriteStyle.hair === 'hood' && (
        <>
          {block('left-[20%] top-[1%] h-[24%] w-[60%]', sprite.accessory)}
          {block('left-[26%] top-[7%] h-[16%] w-[48%]', sprite.hair)}
        </>
      )}

      {spriteStyle.hair === 'tidy-cap' && (
        <>
          {block('left-[23%] top-[3%] h-[12%] w-[54%]', sprite.hair)}
          {fill('left-[24%] top-[13%] h-[5%] w-[52%]', sprite.accessory)}
          {block('right-[22%] top-[13%] h-[12%] w-[12%]', sprite.hair)}
        </>
      )}

      {fill('left-[35%] top-[21%] h-[6%] w-[8%] bg-dungeon-ink', '#0f0f1a')}
      {fill('right-[35%] top-[21%] h-[6%] w-[8%] bg-dungeon-ink', '#0f0f1a')}

      {spriteStyle.accessory === 'visor' && (
        <>
          {fill('left-[31%] top-[21%] h-[6%] w-[38%] bg-dungeon-ink', '#0f0f1a')}
          {fill('left-[34%] top-[22%] h-[3%] w-[32%]', sprite.accessory)}
        </>
      )}

      {spriteStyle.outfit === 'soft-jacket' && (
        <>
          {block('left-[20%] top-[36%] h-[34%] w-[60%]', sprite.outfit)}
          {fill('left-[25%] top-[40%] h-[25%] w-[16%]', sprite.trim)}
          {fill('right-[25%] top-[40%] h-[25%] w-[16%]', sprite.trim)}
          {fill('left-[42%] top-[38%] h-[31%] w-[16%]', sprite.accessory)}
        </>
      )}

      {spriteStyle.outfit === 'wrap-scarf' && (
        <>
          {block('left-[20%] top-[36%] h-[34%] w-[60%]', sprite.outfit)}
          {fill('left-[22%] top-[34%] h-[9%] w-[58%]', sprite.accessory)}
          {fill('right-[12%] top-[40%] h-[20%] w-[16%]', sprite.accessory)}
          {fill('left-[36%] top-[46%] h-[18%] w-[28%]', sprite.trim)}
        </>
      )}

      {spriteStyle.outfit === 'utility-cloak' && (
        <>
          {block('left-[22%] top-[35%] h-[37%] w-[56%]', sprite.outfit)}
          {fill('left-[31%] top-[38%] h-[28%] w-[38%]', sprite.trim)}
          {fill('left-[20%] top-[33%] h-[10%] w-[60%]', sprite.accessory)}
        </>
      )}

      {spriteStyle.outfit === 'planner-coat' && (
        <>
          {block('left-[23%] top-[35%] h-[40%] w-[54%]', sprite.outfit)}
          {fill('left-[31%] top-[39%] h-[31%] w-[13%]', sprite.trim)}
          {fill('right-[31%] top-[39%] h-[31%] w-[13%]', sprite.trim)}
          {fill('left-[47%] top-[38%] h-[34%] w-[6%] bg-dungeon-ink', '#0f0f1a')}
        </>
      )}

      {block(armClasses.left, sprite.skin)}
      {block(armClasses.right, sprite.skin)}

      {spriteStyle.accessory === 'badge-sash' &&
        block('right-[13%] top-[37%] h-[12%] w-[18%]', sprite.accessory)}
      {spriteStyle.accessory === 'ribbon-scarf' &&
        block('left-[13%] top-[29%] h-[11%] w-[18%]', sprite.accessory)}
      {spriteStyle.accessory === 'satchel' && (
        <>
          {fill('left-[28%] top-[42%] h-[5%] w-[44%] rotate-12 bg-dungeon-ink', '#0f0f1a')}
          {block('right-[10%] top-[54%] h-[18%] w-[20%]', sprite.accessory)}
        </>
      )}

      {block(legClasses.left, sprite.outfit)}
      {block(legClasses.right, sprite.outfit)}
      {fill('bottom-0 left-[12%] h-[8%] w-[30%]', sprite.boots)}
      {fill('bottom-0 right-[12%] h-[8%] w-[30%]', sprite.boots)}
    </div>
  )
}
