import { useEffect } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { StartScreen } from './components/screens/StartScreen'
import { AvatarSelectScreen } from './components/screens/AvatarSelectScreen'
import { RoomScreen } from './components/screens/RoomScreen'
import { RevealScreen } from './components/screens/RevealScreen'
import { RecapScreen } from './components/screens/RecapScreen'
import { PixelCompanion } from './components/ui/PixelCompanion'
import { useGameState } from './hooks/useGameState'
import { useSound } from './hooks/useSound'
import type { Choice } from './data/rooms'
import type { Avatar } from './data/avatars'

export default function App() {
  const {
    state,
    currentRoom,
    startRun,
    selectAvatar,
    submitChoice,
    nextRoom,
    restart,
  } = useGameState()
  const sound = useSound()

  // Play room-enter when a new room intro mounts.
  useEffect(() => {
    if (state.phase === 'room-intro' && currentRoom) {
      sound.play('room-enter')
    }
  }, [state.phase, currentRoom, sound])

  // Play recap fanfare when reaching the recap.
  useEffect(() => {
    if (state.phase === 'recap') {
      sound.play('recap-fanfare')
    }
  }, [state.phase, sound])

  function handleStart() {
    sound.play('ui-click')
    startRun()
  }

  function handleAvatar(avatar: Avatar) {
    sound.play('ui-click')
    selectAvatar(avatar)
  }

  function handleAvatarPreview() {
    sound.play('ui-click')
  }

  function handleChoice(choice: Choice) {
    sound.play('choice-select')
    submitChoice(choice)
    // Slight delay before the bias reveal sting.
    window.setTimeout(() => {
      sound.play(choice.isBiased ? 'incorrect' : 'correct')
      window.setTimeout(() => sound.play('bias-reveal'), 220)
    }, 240)
  }

  function handleNext() {
    sound.play('ui-click')
    nextRoom()
  }

  function handleRestart() {
    sound.play('ui-click')
    restart()
  }

  const showCompanion =
    state.phase === 'room-intro' || state.phase === 'reveal'
  const companionMood = state.phase === 'reveal' ? 'reveal' : 'walking'

  return (
    <MotionConfig reducedMotion="user">
      <main className="flex min-h-screen w-full flex-col items-center justify-start px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {state.phase === 'start' && (
              <StartScreen key="start" onStart={handleStart} />
            )}

            {state.phase === 'avatar-select' && (
              <AvatarSelectScreen
                key="avatar-select"
                onConfirm={handleAvatar}
                onPreview={handleAvatarPreview}
              />
            )}

            {state.phase === 'room-intro' && currentRoom && state.avatar && (
              <RoomScreen
                key={`room-${currentRoom.id}`}
                room={currentRoom}
                roomIndex={state.currentRoomIndex}
                totalRooms={state.runQueue.length}
                avatar={state.avatar}
                onChoose={handleChoice}
              />
            )}

            {state.phase === 'reveal' &&
              currentRoom &&
              state.currentChoice &&
              state.avatar && (
                <RevealScreen
                  key={`reveal-${currentRoom.id}`}
                  room={currentRoom}
                  choice={state.currentChoice}
                  avatar={state.avatar}
                  roomIndex={state.currentRoomIndex}
                  totalRooms={state.runQueue.length}
                  isLast={
                    state.currentRoomIndex >= state.runQueue.length - 1
                  }
                  onNext={handleNext}
                />
              )}

            {state.phase === 'recap' && state.avatar && (
              <RecapScreen
                key="recap"
                results={state.results}
                avatar={state.avatar}
                onRestart={handleRestart}
              />
            )}
          </AnimatePresence>
        </div>

        {showCompanion && (
          <PixelCompanion
            key={`cat-${state.currentRoomIndex}-${state.phase}`}
            mood={companionMood}
            startRight={state.currentRoomIndex % 2 === 0}
          />
        )}

        <footer className="mt-10 font-pixel text-[8px] uppercase tracking-widest text-dungeon-parchmentDark/40">
          Bias Dungeon · v0.1
        </footer>
      </main>
    </MotionConfig>
  )
}
