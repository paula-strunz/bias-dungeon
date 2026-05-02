import { motion } from 'framer-motion'
import type { Avatar } from '../../data/avatars'
import type { RoomResult } from '../../hooks/useGameState'
import { PixelButton } from '../ui/PixelButton'
import { PixelCard } from '../ui/PixelCard'
import { PixelCharacter } from '../ui/PixelCharacter'

interface RecapScreenProps {
  results: RoomResult[]
  avatar: Avatar
  onRestart: () => void
}

export function RecapScreen({ results, avatar, onRestart }: RecapScreenProps) {
  const dodged = results.filter((r) => !r.choseBiased).length
  const total = results.length

  return (
    <motion.section
      key="recap"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex w-full flex-col items-center gap-6"
    >
      <header className="flex flex-col items-center gap-3 text-center">
        <motion.div
          initial={{ scale: 0.4, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 12, delay: 0.1 }}
        >
          <PixelCharacter
            avatar={avatar}
            size="md"
            label={`${avatar.name} completed the run`}
          />
        </motion.div>
        <p className="font-pixel text-[10px] uppercase tracking-widest text-dungeon-parchmentDark sm:text-xs">
          {avatar.name} · run complete
        </p>
        <h2 className="font-pixel text-xl leading-relaxed text-dungeon-parchment sm:text-2xl">
          You dodged {dodged} of {total} traps
        </h2>
        <p className="max-w-md font-body text-sm leading-relaxed text-dungeon-parchmentDark sm:text-base">
          Spotting a bias once is worth more than a perfect score. Here is what
          your brain tried to do.
        </p>
      </header>

      <PixelCard className="!max-w-2xl !py-5">
        <p className="mb-1 font-pixel text-[9px] uppercase tracking-wider text-dungeon-ink/60">
          Character recap
        </p>
        <p className="font-body text-sm font-semibold leading-relaxed text-dungeon-ink sm:text-base">
          {avatar.recapInsight}
        </p>
      </PixelCard>

      <PixelCard>
        <ul className="flex flex-col gap-4">
          {results.map((result, idx) => {
            const dodgedRoom = !result.choseBiased
            return (
              <motion.li
                key={result.roomId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + idx * 0.08 }}
                className="flex flex-col gap-2 border-b-2 border-dashed border-dungeon-ink/15 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-pixel text-[10px] uppercase tracking-wider text-dungeon-ink sm:text-xs">
                    <span
                      className="mr-2 border-2 border-dungeon-ink bg-dungeon-ink px-2 py-1 text-[8px] text-dungeon-parchment"
                      aria-hidden
                    >
                      {result.roomIcon}
                    </span>
                    {result.bias}
                  </p>
                  <span
                    className={[
                      'font-pixel text-[8px] uppercase tracking-widest',
                      dodgedRoom ? 'text-avatar-guardian' : 'text-red-600',
                    ].join(' ')}
                  >
                    {dodgedRoom ? 'Dodged' : 'Fell for it'}
                  </span>
                </div>
                <p className="font-body text-sm leading-relaxed text-dungeon-ink/80">
                  <span className="font-semibold">Tip:</span> {result.tip}
                </p>
                {result.coachingLine && (
                  <p className="font-body text-sm leading-relaxed text-dungeon-ink/80">
                    <span className="font-semibold">Character read:</span>{' '}
                    {result.coachingLine}
                  </p>
                )}
              </motion.li>
            )
          })}
        </ul>
      </PixelCard>

      <PixelButton
        variant="accent"
        accent={avatar.accent}
        onClick={onRestart}
        className="!px-8 !py-4"
      >
        Run it back
      </PixelButton>
    </motion.section>
  )
}
