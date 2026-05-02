import { useState } from 'react'
import { motion } from 'framer-motion'
import { ACCENT_CLASSES, AVATARS, type Avatar } from '../../data/avatars'
import { PixelButton } from '../ui/PixelButton'
import { PixelCard } from '../ui/PixelCard'
import { PixelCharacter } from '../ui/PixelCharacter'
import { StatBars } from '../ui/StatBars'

interface AvatarSelectScreenProps {
  onConfirm: (avatar: Avatar) => void
  onPreview?: () => void
}

export function AvatarSelectScreen({
  onConfirm,
  onPreview,
}: AvatarSelectScreenProps) {
  const [selected, setSelected] = useState<Avatar | null>(AVATARS[0])

  function handlePick(avatar: Avatar) {
    setSelected(avatar)
    onPreview?.()
  }

  return (
    <motion.section
      key="avatar-select"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center gap-6"
    >
      <header className="flex flex-col items-center gap-2 text-center">
        <h2 className="font-pixel text-lg text-dungeon-parchment sm:text-2xl">
          Choose your character
        </h2>
        <p className="max-w-xl font-body text-xs leading-relaxed text-dungeon-parchmentDark sm:text-sm">
          Each one walks the dungeon a little differently.
        </p>
      </header>

      {selected && (
        <div className="grid w-full max-w-4xl gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <PixelCard className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex justify-center sm:w-40">
              <PixelCharacter
                avatar={selected}
                size="lg"
                label={`${selected.name} pixel character`}
              />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <div>
                <p
                  className={`mb-2 font-pixel text-[10px] uppercase tracking-wider ${ACCENT_CLASSES[selected.accent].text}`}
                >
                  {selected.name}
                </p>
                <h3 className="font-pixel text-sm leading-relaxed text-dungeon-ink sm:text-base">
                  {selected.tagline}
                </h3>
              </div>
              <StatBars avatar={selected} />
              <div className="grid gap-3 font-body text-sm leading-relaxed text-dungeon-ink/85 sm:grid-cols-2">
                <p>
                  <span className="font-semibold">Best at:</span>{' '}
                  {selected.strength}
                </p>
                <p>
                  <span className="font-semibold">Watch out:</span>{' '}
                  {selected.watchOut}
                </p>
              </div>
            </div>
          </PixelCard>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {AVATARS.map((avatar) => {
              const isSelected = selected.id === avatar.id
              const accent = ACCENT_CLASSES[avatar.accent]
              return (
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() => handlePick(avatar)}
                  aria-pressed={isSelected}
                  className={[
                    'pixel-press flex items-center gap-3 px-3 py-3 text-left font-body transition',
                    'bg-dungeon-ink text-dungeon-parchment',
                    isSelected
                      ? `pixel-border ${accent.text}`
                      : 'border-2 border-dungeon-parchmentDark/40 hover:border-dungeon-parchment',
                  ].join(' ')}
                >
                  <PixelCharacter avatar={avatar} size="sm" />
                  <span className="font-pixel text-[9px] uppercase leading-tight">
                    {avatar.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      <PixelButton
        variant="accent"
        accent={selected?.accent}
        onClick={() => selected && onConfirm(selected)}
        disabled={!selected}
        className="!px-8 !py-4"
      >
        Start the Run
      </PixelButton>
    </motion.section>
  )
}
