import { motion } from 'framer-motion'
import type { Avatar } from '../../data/avatars'
import type { Choice, Room } from '../../data/rooms'
import { PixelButton } from '../ui/PixelButton'
import { PixelCard } from '../ui/PixelCard'
import { JourneyPath } from '../ui/JourneyPath'

interface RevealScreenProps {
  room: Room
  choice: Choice
  avatar: Avatar
  roomIndex: number
  totalRooms: number
  isLast: boolean
  onNext: () => void
}

export function RevealScreen({
  room,
  choice,
  avatar,
  roomIndex,
  totalRooms,
  isLast,
  onNext,
}: RevealScreenProps) {
  const outcomeText = choice.isBiased
    ? room.reveal.outcome.biased
    : room.reveal.outcome.unbiased

  const verdictLabel = choice.isBiased ? 'Caught the trap' : 'Trap dodged'
  const verdictTone = choice.isBiased
    ? 'bg-red-500 text-dungeon-ink'
    : 'bg-avatar-guardian text-dungeon-ink'

  return (
    <motion.section
      key={`reveal-${room.id}`}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
      className="flex w-full flex-col items-center gap-5"
    >
      <motion.div
        initial={{ scale: 0.4, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 12, delay: 0.15 }}
        className="flex flex-col items-center gap-2"
      >
        <span
          role="status"
          aria-live="polite"
          className={`px-4 py-2 font-pixel text-[10px] uppercase tracking-widest ${verdictTone}`}
        >
          {verdictLabel}
        </span>
        <h2 className="font-pixel text-lg text-dungeon-parchment sm:text-2xl">
          {room.bias}
        </h2>
      </motion.div>

      <JourneyPath
        avatar={avatar}
        current={roomIndex + 1}
        total={totalRooms}
      />

      <PixelCard>
        <p className="mb-1 font-pixel text-[9px] uppercase tracking-wider text-dungeon-ink/60">
          Outcome
        </p>
        <p className="mb-5 font-body text-sm leading-relaxed text-dungeon-ink sm:text-base">
          {outcomeText}
        </p>

        <p className="mb-1 font-pixel text-[9px] uppercase tracking-wider text-dungeon-ink/60">
          What happened in your head
        </p>
        <p className="mb-5 font-body text-sm leading-relaxed text-dungeon-ink sm:text-base">
          {room.reveal.biasExplanation}
        </p>

        <div className="border-t-2 border-dashed border-dungeon-ink/20 pt-4">
          <p className="mb-1 font-pixel text-[9px] uppercase tracking-wider text-dungeon-ink/60">
            Try this next time
          </p>
          <p className="font-body text-sm font-semibold leading-relaxed text-dungeon-ink sm:text-base">
            {room.reveal.tip}
          </p>
        </div>

        {room.coachingLine && (
          <div className="mt-4 border-t-2 border-dashed border-dungeon-ink/20 pt-4">
            <p className="mb-1 font-pixel text-[9px] uppercase tracking-wider text-dungeon-ink/60">
              Character read
            </p>
            <p className="font-body text-sm font-semibold leading-relaxed text-dungeon-ink sm:text-base">
              {room.coachingLine}
            </p>
          </div>
        )}
      </PixelCard>

      <PixelButton
        variant="accent"
        accent={avatar.accent}
        onClick={onNext}
        className="!px-8 !py-4"
      >
        {isLast ? 'See your run' : 'Next room'}
      </PixelButton>
    </motion.section>
  )
}
