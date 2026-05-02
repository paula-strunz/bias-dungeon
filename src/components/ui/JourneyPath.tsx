import { motion, useReducedMotion } from 'framer-motion'
import type { Avatar } from '../../data/avatars'
import { PixelCharacter } from './PixelCharacter'

interface JourneyPathProps {
  avatar: Avatar
  current: number
  total: number
}

export function JourneyPath({ avatar, current, total }: JourneyPathProps) {
  const prefersReducedMotion = useReducedMotion()
  const safeTotal = Math.max(total, 1)
  const safeCurrent = Math.min(Math.max(current, 1), safeTotal)
  const percent =
    safeTotal === 1 ? 100 : ((safeCurrent - 1) / (safeTotal - 1)) * 100

  return (
    <div
      className="relative h-20 w-full max-w-2xl"
      aria-label={`Journey progress ${safeCurrent} of ${safeTotal}`}
    >
      <div className="absolute left-0 right-0 top-9 h-3 border-2 border-dungeon-parchment bg-dungeon-ink">
        <div className="grid h-full grid-cols-5">
          {Array.from({ length: safeTotal }, (_, index) => (
            <span
              key={index}
              className="border-r-2 border-dungeon-parchment/30 last:border-r-0"
            />
          ))}
        </div>
      </div>
      <motion.div
        className="absolute top-1"
        initial={false}
        animate={{ left: `${percent}%` }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { type: 'spring', stiffness: 160, damping: 18 }
        }
        style={{ x: '-50%' }}
      >
        <PixelCharacter avatar={avatar} size="sm" />
      </motion.div>
    </div>
  )
}
