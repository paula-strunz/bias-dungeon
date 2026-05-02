import { useCallback, useEffect, useReducer } from 'react'
import { useReducedMotion } from 'framer-motion'

interface PixelCompanionProps {
  mood?: 'walking' | 'reveal'
  startRight?: boolean
}

const WALK_STEP_PX = 3
const WALK_INTERVAL_MS = 90
const CONTAINER_PAD = 16
const CAT_W = 48

interface CatState {
  x: number
  legFrame: number
  facingRight: boolean
}

type CatAction = { type: 'tick'; containerWidth: number }

function catReducer(state: CatState, action: CatAction): CatState {
  const max = action.containerWidth - CAT_W - CONTAINER_PAD
  const min = CONTAINER_PAD
  const next = state.facingRight
    ? state.x + WALK_STEP_PX
    : state.x - WALK_STEP_PX

  if (next >= max) {
    return { x: max, legFrame: (state.legFrame + 1) % 2, facingRight: false }
  }
  if (next <= min) {
    return { x: min, legFrame: (state.legFrame + 1) % 2, facingRight: true }
  }
  return { x: next, legFrame: (state.legFrame + 1) % 2, facingRight: state.facingRight }
}

export function PixelCompanion({ mood = 'walking', startRight = true }: PixelCompanionProps) {
  const prefersReducedMotion = useReducedMotion()

  const [cat, dispatch] = useReducer(catReducer, {
    x: startRight ? CONTAINER_PAD : 500,
    legFrame: 0,
    facingRight: startRight,
  })

  const tick = useCallback(() => {
    const w = document.getElementById('companion-track')?.clientWidth ?? 600
    dispatch({ type: 'tick', containerWidth: w })
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || mood === 'reveal') return
    const id = window.setInterval(tick, WALK_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [prefersReducedMotion, mood, tick])

  const bobY = mood === 'reveal' ? 0 : cat.legFrame === 0 ? 0 : -1
  const tailTilt = cat.legFrame === 0 ? -20 : -35

  return (
    <div
      id="companion-track"
      className="pointer-events-none relative mx-auto mt-4 h-12 w-full max-w-3xl overflow-hidden sm:h-14"
      aria-hidden="true"
    >
      <div
        className="absolute bottom-0 h-10 w-12 [image-rendering:pixelated] sm:h-12 sm:w-14"
        style={{
          left: cat.x,
          transform: `scaleX(${cat.facingRight ? 1 : -1}) translateY(${bobY}px)`,
        }}
      >
        {/* ears */}
        <div className="absolute left-[15%] top-0 h-[22%] w-[18%] border-2 border-dungeon-ink bg-[#8f5f3e]" />
        <div className="absolute left-[52%] top-0 h-[22%] w-[18%] border-2 border-dungeon-ink bg-[#8f5f3e]" />
        <div className="absolute left-[19%] top-[4%] h-[12%] w-[10%] bg-[#f0c6a8]" />
        <div className="absolute left-[56%] top-[4%] h-[12%] w-[10%] bg-[#f0c6a8]" />

        {/* head */}
        <div className="absolute left-[10%] top-[14%] h-[34%] w-[65%] border-2 border-dungeon-ink bg-[#8f5f3e]" />

        {/* eyes */}
        <div className="absolute left-[22%] top-[24%] h-[10%] w-[10%] bg-dungeon-ink" />
        <div className="absolute left-[52%] top-[24%] h-[10%] w-[10%] bg-dungeon-ink" />

        {/* nose */}
        <div className="absolute left-[37%] top-[34%] h-[6%] w-[10%] bg-[#f0c6a8]" />

        {/* whiskers */}
        <div className="absolute left-[5%] top-[32%] h-[2%] w-[18%] bg-dungeon-parchment/50" />
        <div className="absolute right-[12%] top-[32%] h-[2%] w-[18%] bg-dungeon-parchment/50" />
        <div className="absolute left-[5%] top-[38%] h-[2%] w-[16%] bg-dungeon-parchment/50" />
        <div className="absolute right-[12%] top-[38%] h-[2%] w-[16%] bg-dungeon-parchment/50" />

        {/* body */}
        <div className="absolute left-[8%] top-[44%] h-[34%] w-[72%] border-2 border-dungeon-ink bg-[#7b4f32]" />
        <div className="absolute left-[14%] top-[48%] h-[24%] w-[58%] bg-[#f0e6d3]" />

        {/* tail */}
        <div
          className="absolute right-[-4%] top-[30%] h-[10%] w-[24%] origin-bottom-left border-2 border-dungeon-ink bg-[#7b4f32]"
          style={{ transform: `rotate(${tailTilt}deg)` }}
        />

        {/* front legs – alternate frames */}
        {cat.legFrame === 0 ? (
          <>
            <div className="absolute bottom-0 left-[14%] h-[16%] w-[14%] border-2 border-dungeon-ink bg-[#5c3926]" />
            <div className="absolute bottom-0 left-[38%] h-[16%] w-[14%] border-2 border-dungeon-ink bg-[#5c3926]" />
            <div className="absolute bottom-0 left-[56%] h-[16%] w-[14%] border-2 border-dungeon-ink bg-[#5c3926]" />
          </>
        ) : (
          <>
            <div className="absolute bottom-0 left-[20%] h-[16%] w-[14%] border-2 border-dungeon-ink bg-[#5c3926]" />
            <div className="absolute bottom-0 left-[46%] h-[16%] w-[14%] border-2 border-dungeon-ink bg-[#5c3926]" />
            <div className="absolute bottom-0 left-[64%] h-[16%] w-[14%] border-2 border-dungeon-ink bg-[#5c3926]" />
          </>
        )}

        {/* paws */}
        {cat.legFrame === 0 ? (
          <>
            <div className="absolute bottom-0 left-[12%] h-[5%] w-[18%] bg-dungeon-ink" />
            <div className="absolute bottom-0 left-[36%] h-[5%] w-[18%] bg-dungeon-ink" />
            <div className="absolute bottom-0 left-[54%] h-[5%] w-[18%] bg-dungeon-ink" />
          </>
        ) : (
          <>
            <div className="absolute bottom-0 left-[18%] h-[5%] w-[18%] bg-dungeon-ink" />
            <div className="absolute bottom-0 left-[44%] h-[5%] w-[18%] bg-dungeon-ink" />
            <div className="absolute bottom-0 left-[62%] h-[5%] w-[18%] bg-dungeon-ink" />
          </>
        )}
      </div>
    </div>
  )
}
