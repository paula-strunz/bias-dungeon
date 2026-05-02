import { motion } from 'framer-motion'
import { AVATARS } from '../../data/avatars'
import { PixelButton } from '../ui/PixelButton'
import { PixelCharacter } from '../ui/PixelCharacter'

interface StartScreenProps {
  onStart: () => void
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <motion.section
      key="start"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center gap-8 text-center"
    >
      <motion.div
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex items-end gap-3" aria-label="Playable pixel characters">
          {AVATARS.map((avatar, index) => (
            <motion.div
              key={avatar.id}
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 1.2,
                delay: index * 0.12,
                repeat: Infinity,
                repeatDelay: 1.6,
              }}
            >
              <PixelCharacter avatar={avatar} size="sm" />
            </motion.div>
          ))}
        </div>
        <h1 className="font-pixel text-2xl leading-relaxed text-dungeon-parchment sm:text-4xl">
          Bias Dungeon
        </h1>
        <p className="max-w-md font-body text-sm leading-relaxed text-dungeon-parchmentDark sm:text-base">
          A short pixel game that teaches you to spot cognitive biases in
          everyday decisions.
        </p>
        <p className="max-w-xl font-body text-xs leading-relaxed text-dungeon-parchmentDark/85 sm:text-sm">
          Choose a character, enter five rooms, and learn one practical move for
          catching your brain's shortcuts before they catch you.
        </p>
      </motion.div>

      <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-3">
        {['Choose character', 'Face bias rooms', 'Learn bias moves'].map(
          (step, index) => (
            <div
              key={step}
              className="border-2 border-dungeon-parchmentDark/40 bg-dungeon-ink/70 px-4 py-3 text-center"
            >
              <p className="mb-2 font-pixel text-[8px] uppercase tracking-widest text-dungeon-parchmentDark">
                Step {index + 1}
              </p>
              <p className="font-body text-sm font-semibold text-dungeon-parchment">
                {step}
              </p>
            </div>
          )
        )}
      </div>

      <PixelButton onClick={onStart} className="!px-8 !py-4 !text-xs sm:!text-sm">
        Enter the Dungeon
      </PixelButton>

      <p className="font-pixel text-[8px] uppercase tracking-widest text-dungeon-parchmentDark/60 sm:text-[9px]">
        ~ 5 minutes · headphones recommended
      </p>
    </motion.section>
  )
}
