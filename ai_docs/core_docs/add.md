---
title: Bias Dungeon Architecture Design
type: architecture
status: active
created: 2026-04-25
updated: 2026-04-26
tags: [react, vite, typescript, tailwind, vercel, browser-game]
---

# Architecture Design Document — Bias Dungeon

## 1. Overview

Bias Dungeon is a static, client-side browser game. There is no backend, no database, and no server — everything runs in the browser. The app is built as a React + Vite single-page application, deployed to Vercel from a GitHub repository.

The interaction model is screen-by-screen (not real-time or canvas-based), which maps cleanly to React components: each game state is a full-screen view that renders, accepts input, and transitions to the next.

---

## 2. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React 18 + Vite | Standard for Vercel; component model fits screen-by-screen flow |
| Language | TypeScript | Catches errors before they reach the browser; data structures are well-typed |
| Styling | Tailwind CSS | Responsive by default; pixel-art aesthetic via utility classes |
| Animation | Framer Motion | Polished screen transitions and reveal animations with minimal code |
| Font | Press Start 2P (Google Fonts) | Classic pixel font, free, loads from CDN |
| Audio | Howler.js | Industry-standard web audio; handles retro chiptune sounds reliably |
| Sound assets | Kenney.nl game audio pack (CC0) | Free, high-quality retro sound effects, no licensing issues |
| Deployment | Vercel (static) | Auto-deploys on push to `main`; free tier; native Vite support |

---

## 3. Project Structure

```
bias-dungeon/
├── src/
│   ├── components/
│   │   ├── screens/           # Full-screen game states
│   │   │   ├── StartScreen.tsx
│   │   │   ├── AvatarSelectScreen.tsx
│   │   │   ├── RoomScreen.tsx
│   │   │   ├── RevealScreen.tsx
│   │   │   └── RecapScreen.tsx
│   │   └── ui/                # Reusable UI pieces
│   │       ├── PixelButton.tsx
│   │       ├── PixelCard.tsx
│   │       └── ProgressBar.tsx
│   ├── data/
│   │   ├── rooms.ts           # All 5 room definitions
│   │   └── avatars.ts         # Character definitions
│   ├── hooks/
│   │   ├── useGameState.ts    # Game state machine
│   │   └── useSound.ts        # Sound playback hook
│   ├── sounds/                # .mp3 audio files
│   ├── styles/
│   │   └── pixel.css          # Custom pixel-art border and shadow utilities
│   ├── App.tsx                # Root component, renders active screen
│   └── main.tsx               # Entry point
├── public/                    # Static assets (favicon, og image)
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 4. Game State Machine

The game progresses linearly through a fixed set of states. State lives in a single `useGameState` hook at the top of the component tree; no external state library is needed for MVP.

```
start → avatar-select → room-intro → choice → reveal → [next room or recap]
```

| State | Screen rendered | What happens |
|---|---|---|
| `start` | `StartScreen` | Title, tagline, "Enter the Dungeon" button |
| `avatar-select` | `AvatarSelectScreen` | Pick one of 4 pixel characters; sets accent color and scenario framing for the run |
| `room-intro` | `RoomScreen` | Scenario card + 2-3 choice buttons |
| `reveal` | `RevealScreen` | Outcome text, bias name, anti-bias tip |
| `recap` | `RecapScreen` | Summary of all biases triggered + one-line tips |

Room order is shuffled at run start. After the last reveal, the state machine advances to `recap`.

### State shape

```typescript
interface GameState {
  phase: 'start' | 'avatar-select' | 'room-intro' | 'reveal' | 'recap'
  avatar: Avatar | null
  roomQueue: Room[]          // shuffled order
  currentRoomIndex: number
  results: RoomResult[]      // one entry per completed room
}
```

---

## 5. Data Layer

All game content lives in TypeScript files under `src/data/`. No API calls, no CMS. Adding a new room means adding one object to `rooms.ts`.

### Room definition

```typescript
interface Room {
  id: string
  title: string               // "Fake Sale Chamber"
  bias: string                // "Anchoring"
  roomIcon: string            // Short pixel-safe label, e.g. "SALE"
  scenario: string            // 2-3 sentence setup
  choices: Choice[]           // 2-3 options
  reveal: Reveal
  variants?: Partial<Record<AccentKey, CharacterVariant>>
}

interface Choice {
  id: string
  text: string
  isBiased: boolean
}

interface Reveal {
  outcome: {
    biased: string            // What happened after a biased choice
    unbiased: string          // What happened after an unbiased choice
  }
  biasExplanation: string     // Plain-language explanation, max ~100 words
  tip: string                 // One concrete "what to do instead" action
}

interface CharacterVariant {
  scenario?: string
  choices?: Choice[]
  reveal?: Partial<Reveal>
  coachingLine: string
}
```

### Avatar definition

Four playable characters, each with a name, short tagline, Tailwind accent color, CSS pixel sprite palette, retro stat bars, learning copy, and recap insight.

```typescript
interface Avatar {
  id: string
  name: string                // "The Explorer"
  tagline: string             // Short character-select pitch
  accent: AccentKey           // Tailwind avatar color token
  brainHabit: string          // Character-specific thinking pattern
  strength: string
  watchOut: string
  recapInsight: string
  stats: CharacterStats       // action, people, analysis from 1-5
  sprite: SpritePalette       // CSS pixel character colors
  spriteStyle: SpriteStyle    // hair, outfit, accessory, stance variants
}
```

Planned characters: The Explorer (red), The Spark (yellow), The Guardian (green), The Strategist (blue).
Each character uses the same CSS pixel rendering component but has mostly gender-neutral, role-based silhouette/costume layers: Explorer has a side-swept headband, soft jacket, badge sash, and ready stance; Spark has fluffy hair, wrap scarf, ribbon detail, and lively stance; Guardian has a hood, utility cloak, satchel, and steady stance; Strategist has a tidy cap, visor, planner coat, and focused stance.

---

## 6. Audio

Howler.js manages all audio. A `useSound` hook exposes named play functions so components never touch Howler directly.

### Sound events

| Event | When it fires |
|---|---|
| `ui-click` | Any button press |
| `room-enter` | Transitioning into a new room |
| `choice-select` | Player taps a choice |
| `bias-reveal` | The bias name appears on screen |
| `correct` | Player picked the unbiased option |
| `incorrect` | Player picked the biased option |
| `recap-fanfare` | Recap screen loads |

All sounds are short retro chiptune clips (under 2 seconds). Assets sourced from the Kenney.nl Interface Sounds and Retro game audio packs (CC0 — no attribution required, free to use commercially).

---

## 7. Visual Design System

The pixel aesthetic is achieved through CSS, not a canvas renderer. This keeps the app fully responsive and accessible.

### Approach

- **Pixel borders:** `image-rendering: pixelated` + multi-layer `box-shadow` creates chunky pixel-style borders on cards and buttons
- **Pixel characters:** CSS block layers render reusable characters with per-character hair, clothes, accessories, and stance variants; no external sprite sheets are required
- **Typography:** Press Start 2P at 8px–16px sizes; larger text uses a clean sans-serif (Inter) for readability
- **Color palette:** Dark dungeon background (#1a1a2e), parchment card backgrounds (#f0e6d3), avatar accent colors for interactive elements
- **Animations:** Framer Motion handles screen enter/exit (slide + fade), choice reveal (scale up), and bias name pop (bounce)
- **Responsive:** Tailwind's `sm:` / `md:` breakpoints; game cards max-width 640px, centered; touch targets minimum 44px

---

## 8. Deployment Pipeline

```
Developer pushes to GitHub (main branch)
         ↓
Vercel detects push via webhook
         ↓
Vercel runs: npm install → npm run build (vite build)
         ↓
Static output in dist/ deployed to Vercel CDN
         ↓
Live at bias-dungeon.vercel.app (or custom domain)
```

- No environment variables required for MVP
- Preview deployments auto-generated for every pull request
- Build time: under 30 seconds

---

## 9. Accessibility

- All interactive elements are keyboard-navigable
- Choice buttons have visible focus states
- Color is never the only indicator (bias reveal uses text + icon, not just color)
- `aria-label` on icon-only controls
- Reduced-motion: Framer Motion respects `prefers-reduced-motion` — animations skip for users who need it

---

## 10. What is Out of Scope for MVP

| Feature | Where it goes |
|---|---|
| AI-generated feedback on free-text reasoning | V2 — requires backend + Claude API |
| Persistent scores or user accounts | V2 |
| Multiplayer or social share card | V3 |
| Creator/editor tooling for new rooms | V3 |
| Native mobile app | Not planned |

---

## 11. Open Questions

- [ ] Custom domain for the Vercel deployment, or use the default `.vercel.app` URL for the portfolio demo?
- [ ] Should the recap screen be shareable (a static image or URL with results encoded)?
- [ ] Press Start 2P is hard to read at small sizes on mobile — should body copy fall back to a readable pixel-adjacent font (e.g., VT323) for longer scenario text?
