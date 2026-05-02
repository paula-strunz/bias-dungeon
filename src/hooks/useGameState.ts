import { useCallback, useMemo, useState } from 'react'
import type { Avatar } from '../data/avatars'
import {
  ROOMS,
  resolveRoom,
  type BiasRoom,
  type Choice,
  type Difficulty,
  type Room,
  type RoomVariant,
} from '../data/rooms'

export type Phase =
  | 'start'
  | 'avatar-select'
  | 'room-intro'
  | 'reveal'
  | 'recap'

export interface RoomResult {
  roomId: string
  bias: string
  title: string
  roomIcon: string
  variantId: string
  difficulty: Difficulty
  choseBiased: boolean
  outcomeLabel: string
  tip: string
  coachingLine?: string
}

export interface RunStep {
  room: BiasRoom
  variant: RoomVariant
}

export interface GameState {
  phase: Phase
  avatar: Avatar | null
  runQueue: RunStep[]
  currentRoomIndex: number
  currentChoice: Choice | null
  results: RoomResult[]
}

const DIFFICULTY_ORDER: Record<Difficulty, number> = {
  easy: 0,
  medium: 1,
  hard: 2,
}

function pickVariant(room: BiasRoom): RoomVariant {
  const variants = Object.values(room.variants)
  return variants[Math.floor(Math.random() * variants.length)]
}

function buildRunQueue(): RunStep[] {
  const steps: RunStep[] = ROOMS.map((room) => ({
    room,
    variant: pickVariant(room),
  }))
  return steps
    .map((step) => ({ step, jitter: Math.random() }))
    .sort((a, b) => {
      const diff =
        DIFFICULTY_ORDER[a.step.variant.difficulty] -
        DIFFICULTY_ORDER[b.step.variant.difficulty]
      if (diff !== 0) return diff
      return a.jitter - b.jitter
    })
    .map(({ step }) => step)
}

function freshState(): GameState {
  return {
    phase: 'start',
    avatar: null,
    runQueue: buildRunQueue(),
    currentRoomIndex: 0,
    currentChoice: null,
    results: [],
  }
}

export function useGameState() {
  const [state, setState] = useState<GameState>(freshState)

  const startRun = useCallback(() => {
    setState((s) => ({ ...s, phase: 'avatar-select' }))
  }, [])

  const selectAvatar = useCallback((avatar: Avatar) => {
    setState((s) => ({
      ...s,
      avatar,
      phase: 'room-intro',
      runQueue: buildRunQueue(),
      currentRoomIndex: 0,
      currentChoice: null,
      results: [],
    }))
  }, [])

  const submitChoice = useCallback((choice: Choice) => {
    setState((s) => ({ ...s, currentChoice: choice, phase: 'reveal' }))
  }, [])

  const nextRoom = useCallback(() => {
    setState((s) => {
      const step = s.runQueue[s.currentRoomIndex]
      const choice = s.currentChoice
      if (!step || !choice) return s
      const resolved = resolveRoom(step.room, step.variant, s.avatar)
      const result: RoomResult = {
        roomId: resolved.id,
        bias: resolved.bias,
        title: resolved.title,
        roomIcon: resolved.roomIcon,
        variantId: resolved.variantId,
        difficulty: resolved.difficulty,
        choseBiased: choice.isBiased,
        outcomeLabel: choice.outcomeLabel,
        tip: resolved.reveal.tip,
        coachingLine: resolved.coachingLine,
      }
      const results = [...s.results, result]
      const nextIndex = s.currentRoomIndex + 1
      const isLast = nextIndex >= s.runQueue.length
      return {
        ...s,
        results,
        currentChoice: null,
        currentRoomIndex: nextIndex,
        phase: isLast ? 'recap' : 'room-intro',
      }
    })
  }, [])

  const restart = useCallback(() => {
    setState(freshState())
  }, [])

  const currentRoom = useMemo<Room | null>(() => {
    const step = state.runQueue[state.currentRoomIndex]
    if (!step) return null
    return resolveRoom(step.room, step.variant, state.avatar)
  }, [state.runQueue, state.currentRoomIndex, state.avatar])

  return {
    state,
    currentRoom,
    startRun,
    selectAvatar,
    submitChoice,
    nextRoom,
    restart,
  }
}
