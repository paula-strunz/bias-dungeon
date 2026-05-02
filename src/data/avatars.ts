export type AccentKey = 'explorer' | 'spark' | 'guardian' | 'strategist'

export type StatKey = 'action' | 'people' | 'analysis'

export interface CharacterStats {
  action: number
  people: number
  analysis: number
}

export type HairStyle = 'side-sweep' | 'fluffy' | 'hood' | 'tidy-cap'
export type OutfitStyle = 'soft-jacket' | 'wrap-scarf' | 'utility-cloak' | 'planner-coat'
export type AccessoryStyle = 'badge-sash' | 'ribbon-scarf' | 'satchel' | 'visor'
export type StanceStyle = 'ready' | 'lively' | 'steady' | 'focused'

export interface SpritePalette {
  skin: string
  hair: string
  outfit: string
  trim: string
  accessory: string
  boots: string
}

export interface SpriteStyle {
  hair: HairStyle
  outfit: OutfitStyle
  accessory: AccessoryStyle
  stance: StanceStyle
}

export interface Avatar {
  id: AccentKey
  name: string
  tagline: string
  accent: AccentKey
  brainHabit: string
  strength: string
  watchOut: string
  recapInsight: string
  stats: CharacterStats
  sprite: SpritePalette
  spriteStyle: SpriteStyle
}

export const AVATARS: Avatar[] = [
  {
    id: 'explorer',
    name: 'The Explorer',
    tagline: 'Curious steps, quick choices, always moving.',
    accent: 'explorer',
    brainHabit: 'Acts before the room finishes setting the trap.',
    strength: 'Great at cutting through noise and making a call.',
    watchOut: 'Pause before the first exciting option becomes the only option.',
    recapInsight:
      'Your edge is curiosity in motion. Your bias risk is treating the first path as proof that it is the right one.',
    stats: { action: 5, people: 2, analysis: 2 },
    sprite: {
      skin: '#f0c7a1',
      hair: '#2f1b14',
      outfit: '#ef4444',
      trim: '#facc15',
      accessory: '#facc15',
      boots: '#451a03',
    },
    spriteStyle: {
      hair: 'side-sweep',
      outfit: 'soft-jacket',
      accessory: 'badge-sash',
      stance: 'ready',
    },
  },
  {
    id: 'spark',
    name: 'The Spark',
    tagline: 'Big energy, quick connections, bright ideas.',
    accent: 'spark',
    brainHabit: 'Follows the story that feels most alive.',
    strength: 'Great at noticing people, patterns, and possibilities.',
    watchOut: 'A vivid story can feel true before the facts arrive.',
    recapInsight:
      'Your edge is imagination. Your bias risk is letting a memorable story outrun the evidence.',
    stats: { action: 4, people: 5, analysis: 1 },
    sprite: {
      skin: '#f2b88f',
      hair: '#7c2d12',
      outfit: '#eab308',
      trim: '#fef3c7',
      accessory: '#f97316',
      boots: '#78350f',
    },
    spriteStyle: {
      hair: 'fluffy',
      outfit: 'wrap-scarf',
      accessory: 'ribbon-scarf',
      stance: 'lively',
    },
  },
  {
    id: 'guardian',
    name: 'The Guardian',
    tagline: 'Steady, loyal, and tuned to the room.',
    accent: 'guardian',
    brainHabit: 'Keeps the peace, even when the default needs questioning.',
    strength: 'Great at seeing how choices affect other people.',
    watchOut: 'Comfort and harmony can make a weak option look safer than it is.',
    recapInsight:
      'Your edge is care. Your bias risk is protecting the familiar even when a better choice is available.',
    stats: { action: 2, people: 5, analysis: 3 },
    sprite: {
      skin: '#d8a47f',
      hair: '#1f2937',
      outfit: '#22c55e',
      trim: '#bbf7d0',
      accessory: '#14532d',
      boots: '#064e3b',
    },
    spriteStyle: {
      hair: 'hood',
      outfit: 'utility-cloak',
      accessory: 'satchel',
      stance: 'steady',
    },
  },
  {
    id: 'strategist',
    name: 'The Strategist',
    tagline: 'Careful reads, sharp checks, clean logic.',
    accent: 'strategist',
    brainHabit: 'Looks for the system behind the situation.',
    strength: 'Great at slowing down and checking the details.',
    watchOut: 'A polished number, app, or label can look more reliable than it is.',
    recapInsight:
      'Your edge is precision. Your bias risk is trusting neat information more than messy reality.',
    stats: { action: 2, people: 2, analysis: 5 },
    sprite: {
      skin: '#c89f7d',
      hair: '#111827',
      outfit: '#3b82f6',
      trim: '#dbeafe',
      accessory: '#93c5fd',
      boots: '#172554',
    },
    spriteStyle: {
      hair: 'tidy-cap',
      outfit: 'planner-coat',
      accessory: 'visor',
      stance: 'focused',
    },
  },
]

export const ACCENT_CLASSES: Record<
  AccentKey,
  { bg: string; bgHover: string; text: string; border: string; ring: string }
> = {
  explorer: {
    bg: 'bg-avatar-explorer',
    bgHover: 'hover:bg-avatar-explorer/90',
    text: 'text-avatar-explorer',
    border: 'border-avatar-explorer',
    ring: 'ring-avatar-explorer',
  },
  spark: {
    bg: 'bg-avatar-spark',
    bgHover: 'hover:bg-avatar-spark/90',
    text: 'text-avatar-spark',
    border: 'border-avatar-spark',
    ring: 'ring-avatar-spark',
  },
  guardian: {
    bg: 'bg-avatar-guardian',
    bgHover: 'hover:bg-avatar-guardian/90',
    text: 'text-avatar-guardian',
    border: 'border-avatar-guardian',
    ring: 'ring-avatar-guardian',
  },
  strategist: {
    bg: 'bg-avatar-strategist',
    bgHover: 'hover:bg-avatar-strategist/90',
    text: 'text-avatar-strategist',
    border: 'border-avatar-strategist',
    ring: 'ring-avatar-strategist',
  },
}
