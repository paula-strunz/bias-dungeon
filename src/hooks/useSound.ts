import { useMemo } from 'react'
import { Howl } from 'howler'

import uiClick from '../sounds/ui-click.ogg'
import roomEnter from '../sounds/room-enter.ogg'
import choiceSelect from '../sounds/choice-select.ogg'
import biasReveal from '../sounds/bias-reveal.ogg'
import correct from '../sounds/correct.ogg'
import incorrect from '../sounds/incorrect.ogg'
import recapFanfare from '../sounds/recap-fanfare.ogg'

export type SoundEvent =
  | 'ui-click'
  | 'room-enter'
  | 'choice-select'
  | 'bias-reveal'
  | 'correct'
  | 'incorrect'
  | 'recap-fanfare'

const SOURCES: Record<SoundEvent, string> = {
  'ui-click': uiClick,
  'room-enter': roomEnter,
  'choice-select': choiceSelect,
  'bias-reveal': biasReveal,
  correct,
  incorrect,
  'recap-fanfare': recapFanfare,
}

const VOLUME: Record<SoundEvent, number> = {
  'ui-click': 0.35,
  'room-enter': 0.45,
  'choice-select': 0.45,
  'bias-reveal': 0.55,
  correct: 0.55,
  incorrect: 0.5,
  'recap-fanfare': 0.6,
}

const howls: Record<SoundEvent, Howl> = Object.fromEntries(
  (Object.keys(SOURCES) as SoundEvent[]).map((key) => [
    key,
    new Howl({ src: [SOURCES[key]], volume: VOLUME[key], preload: true }),
  ])
) as Record<SoundEvent, Howl>

export function useSound() {
  return useMemo(
    () => ({
      play(event: SoundEvent) {
        howls[event]?.play()
      },
    }),
    []
  )
}
