import { motion } from 'framer-motion'
import type { Avatar } from '../../data/avatars'
import type { Choice, Room } from '../../data/rooms'
import { PixelButton } from '../ui/PixelButton'
import { PixelCard } from '../ui/PixelCard'
import { ProgressBar } from '../ui/ProgressBar'
import { JourneyPath } from '../ui/JourneyPath'

interface RoomScreenProps {
  room: Room
  roomIndex: number
  totalRooms: number
  avatar: Avatar
  onChoose: (choice: Choice) => void
}

export function RoomScreen({
  room,
  roomIndex,
  totalRooms,
  avatar,
  onChoose,
}: RoomScreenProps) {
  return (
    <motion.section
      key={`room-${room.id}`}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
      className="flex w-full flex-col items-center gap-6"
    >
      <ProgressBar
        current={roomIndex + 1}
        total={totalRooms}
        accent={avatar.accent}
      />
      <JourneyPath
        avatar={avatar}
        current={roomIndex + 1}
        total={totalRooms}
      />

      <PixelCard>
        <p className="mb-3 flex items-center gap-2 font-pixel text-[10px] uppercase tracking-widest text-avatar-strategist sm:text-xs">
          <span
            className="border-2 border-dungeon-ink bg-dungeon-ink px-2 py-1 text-[8px] text-dungeon-parchment"
            aria-hidden
          >
            {room.roomIcon}
          </span>
          {room.title}
        </p>
        <p className="mb-6 font-body text-[15px] leading-relaxed text-dungeon-ink sm:text-lg">
          {room.scenario}
        </p>
        <div className="flex flex-col gap-3">
          {room.choices.map((choice) => (
            <motion.div
              key={choice.id}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.08 }}
            >
              <PixelButton
                onClick={() => onChoose(choice)}
                fullWidth
                className="!text-left !normal-case !tracking-normal !text-xs sm:!text-sm"
              >
                {choice.text}
              </PixelButton>
            </motion.div>
          ))}
        </div>
      </PixelCard>
    </motion.section>
  )
}
