---
title: Bias Dungeon Work Breakdown Structure
type: wbs
status: active
created: 2026-04-25
updated: 2026-04-25
tags: [mvp, v1, implementation-plan]
---

# Work Breakdown Structure — Bias Dungeon MVP

## Summary

4 phases, roughly 4–6 focused build sessions. Everything builds toward one fully playable browser run: start → pick avatar → 5 bias rooms → recap. Deployment to Vercel at the end of Phase 4.

## Current status (2026-04-25)

| Phase | Status | Notes |
|---|---|---|
| 1. Foundation | **Complete** | All 8 tasks done. Live at vercel.com/paulitas-projects/bias-dungeon. |
| 2. Design System + Data | **Complete** | All 14 tasks done. Sounds, rooms, avatars, UI primitives all in. |
| 3. Screens + State Machine | **Complete** | All 11 tasks done. Full playable run end-to-end. |
| 4. Polish + Deploy | **Complete** | All 9 tasks done. MVP shipped 2026-04-25. |
| 5. Character + Learning Iteration | **Complete** | Four distinct pixel characters, personalized room variants, journey path, and docs update completed 2026-04-26. |
| 6. Scenario Variants + Difficulty | **Complete** | 3 variants per bias (15 scenarios), progressive easy → hard ordering, room queue rebuilt per run. Completed 2026-04-26. |

Timeline source: [`project_charter.md`](project_charter.md) §8.

---

## Phase 1: Foundation

Set up the project so all subsequent work has a stable base.

| Task | Status | Complexity | Notes |
|---|---|---|---|
| 1.1 Init Vite + React + TypeScript project | Done 2026-04-25 | Low | Vite react-ts template via degit (in-place). |
| 1.2 Configure Tailwind CSS | Done 2026-04-25 | Low | Tailwind v3 + custom `dungeon-*` and `avatar-*` palette in [`tailwind.config.ts`](../../tailwind.config.ts). |
| 1.3 Install Framer Motion | Done 2026-04-25 | Low | `framer-motion` latest. |
| 1.4 Install Howler.js | Done 2026-04-25 | Low | `howler` + `@types/howler`. |
| 1.5 Add Press Start 2P font via Google Fonts | Done 2026-04-25 | Low | `<link>` in [`index.html`](../../index.html), `font-pixel` + `font-body` families in Tailwind. |
| 1.6 Create folder structure per ADD | Done 2026-04-25 | Low | `screens/`, `ui/`, `data/`, `hooks/`, `sounds/`, `styles/pixel.css` with `.gitkeep` placeholders. |
| 1.7 Connect GitHub repo to Vercel | Done 2026-04-25 | Low | Connected via Vercel dashboard. Project: paulitas-projects/bias-dungeon. |
| 1.8 Verify first deploy (blank app live on Vercel) | Done 2026-04-25 | Low | Live deploy confirmed at vercel.com/paulitas-projects/bias-dungeon. |

**Exit criteria:** Empty app deploys successfully to Vercel from GitHub.

---

## Phase 2: Design System + Data Layer

Build the visual primitives and all game content before wiring up any screens. Getting the look right and the data right first prevents rework later.

### 2A. Design System

| Task | Status | Complexity | Notes |
|---|---|---|---|
| 2.1 Define color palette in `tailwind.config.ts` | Done 2026-04-25 | Low | `dungeon-*` and `avatar-*` keys in [`tailwind.config.ts`](../../tailwind.config.ts). |
| 2.2 Build pixel-art border + shadow CSS utilities | Done 2026-04-25 | Medium | `pixel-border`, `pixel-border-parchment`, `pixel-inset`, `pixel-press` in [`src/index.css`](../../src/index.css). |
| 2.3 `PixelButton` component | Done 2026-04-25 | Low | Variants: primary, accent, ghost. Accepts `accent` for avatar themes. |
| 2.4 `PixelCard` component | Done 2026-04-25 | Low | Parchment + dark variants with pixel border + inset highlight. |
| 2.5 `ProgressBar` component | Done 2026-04-25 | Low | Accent-themed fill, ARIA progressbar role, percent label. |
| 2.6 Typography scale | Done 2026-04-25 | Low | Press Start 2P (`font-pixel`), body fallback `font-body`, focus-visible ring. |

### 2B. Game Content

| Task | Status | Complexity | Notes |
|---|---|---|---|
| 2.7 Define TypeScript interfaces | Done 2026-04-25 | Low | `Room`, `Choice`, `Reveal`, `Avatar` in [`src/data/`](../../src/data). |
| 2.8 Write 5 avatar class definitions | Superseded 2026-04-26 | Low | Replaced by four pixel character archetypes in Phase 5. |
| 2.9 Write room: Fake Sale Chamber (Anchoring) | Done 2026-04-25 | Medium | Headphones fake-discount scenario; 3 choices; outcome/explanation/tip. |
| 2.10 Write room: Viral Panic Hall (Availability bias) | Done 2026-04-25 | Medium | Porch-theft viral story scenario. |
| 2.11 Write room: Gossip Mirror (Confirmation bias) | Done 2026-04-25 | Medium | Coworker rumor scenario. |
| 2.12 Write room: Oracle Route (Automation bias) | Done 2026-04-25 | Medium | Maps app vs. road cones scenario. |
| 2.13 Write room: Sunken Treasure Pit (Sunk cost) | Done 2026-04-25 | Medium | Bad-movie ticket scenario. |
| 2.14 Download and organize sound assets | Done 2026-04-25 | Low | 7 `.ogg` files in [`src/sounds/`](../../src/sounds) sourced from Kenney Interface Sounds + UI Audio packs. |

**Exit criteria:** All 5 rooms pass a content review (scenario under 3 sentences, explanation under 100 words, one concrete tip). All UI primitives render correctly at desktop and mobile widths.

---

## Phase 3: Game Screens + State Machine

Wire the full playable loop.

### 3A. State Machine

| Task | Status | Complexity | Notes |
|---|---|---|---|
| 3.1 `useGameState` hook | Done 2026-04-25 | Medium | Phases, shuffle, results array, choice tracking in [`src/hooks/useGameState.ts`](../../src/hooks/useGameState.ts). |
| 3.2 `useSound` hook | Done 2026-04-25 | Low | Howler-backed; per-event volume; preload + cleanup in [`src/hooks/useSound.ts`](../../src/hooks/useSound.ts). |
| 3.3 Root `App.tsx` — renders active screen based on phase | Done 2026-04-25 | Low | `AnimatePresence` + per-phase render blocks; sound dispatch wired here. |

### 3B. Screens

| Task | Status | Complexity | Notes |
|---|---|---|---|
| 3.4 `StartScreen` | Updated 2026-04-26 | Low | Educational hero copy, pixel character lineup, "Enter the Dungeon" CTA. |
| 3.5 `AvatarSelectScreen` | Done 2026-04-25 | Medium | 5 selectable cards, live tagline preview, accent-themed confirm button. |
| 3.6 `RoomScreen` | Done 2026-04-25 | Medium | Progress bar (avatar accent), scenario card, choice buttons with tap feedback. |
| 3.7 `RevealScreen` | Done 2026-04-25 | Medium | Verdict pill, bias name (spring pop), outcome + explanation + tip card. |
| 3.8 `RecapScreen` | Done 2026-04-25 | Medium | Score line, staggered list of all biases with dodged/fell-for-it badges + tips. |

### 3C. Transitions

| Task | Status | Complexity | Notes |
|---|---|---|---|
| 3.9 Screen enter/exit animations (Framer Motion) | Done 2026-04-25 | Medium | `AnimatePresence mode="wait"` in App; per-screen slide + fade variants. |
| 3.10 Bias name reveal animation | Done 2026-04-25 | Low | Spring scale + rotate pop on bias title, delayed by ~150ms. |
| 3.11 Choice button feedback animation | Done 2026-04-25 | Low | `whileTap scale: 0.97` on each choice. |

**Exit criteria:** A full run is completable — start to recap — with all 5 rooms in shuffled order, correct bias shown after each choice, and recap listing all rooms.

---

## Phase 4: Polish + Deploy

| Task | Status | Complexity | Notes |
|---|---|---|---|
| 4.1 Wire sound effects to all 8 events | Done 2026-04-25 | Medium | Done in Phase 3. All 7 events fire from App.tsx. |
| 4.2 Responsive layout — mobile pass | Done 2026-04-25 | Medium | Avatar grid 2-col on mobile / 5-col desktop; scenario body bumped to 15px on mobile. |
| 4.3 Keyboard navigation | Done 2026-04-25 | Low | Native `<button>` elements throughout; global `*:focus-visible` ring in [`src/index.css`](../../src/index.css). |
| 4.4 Reduced-motion support | Done 2026-04-25 | Low | `<MotionConfig reducedMotion="user">` wraps the app; respects OS setting. |
| 4.5 `aria-label` on icon-only controls | Updated 2026-04-26 | Low | Pixel characters and verdict pill keep accessible labels/status where needed. |
| 4.6 Favicon + Open Graph image | Done 2026-04-25 | Low | Custom pixel castle [`favicon.svg`](../../public/favicon.svg) + 1200×630 [`og-image.svg`](../../public/og-image.svg). Meta tags in [`index.html`](../../index.html). |
| 4.7 Final content review pass | Done 2026-04-25 | Low | Tightened Anchoring + Sunk Cost scenarios. All 5 rooms re-read for tone. |
| 4.8 Cross-browser test | Done 2026-04-25 | Low | Owner verified: works great across browsers. |
| 4.9 Final Vercel deploy + smoke test | Done 2026-04-25 | Low | Owner verified: full run plays through on the live URL. |

**Exit criteria:** Full run playable on desktop and mobile, all sounds fire, no visual breakage in Chrome/Safari/Firefox, live on Vercel.

---

## Complexity Summary

| Phase | Tasks | Complexity |
|---|---|---|
| 1. Foundation | 8 | All Low |
| 2. Design System + Data | 14 | Low–Medium |
| 3. Screens + State | 11 | Low–Medium |
| 4. Polish + Deploy | 9 | Low–Medium |
| **Total** | **42** | |

No High-complexity tasks in the MVP. The Medium tasks are primarily content writing (rooms) and the game state machine — both well-defined from the PRD and ADD.

---

## What is Deferred

| Feature | Target version |
|---|---|
| Free-text reasoning with AI feedback | V2 |
| Shareable recap card (image or URL) | V2 |
| More than 5 rooms / scenario variants | V2 |
| Adaptive recap based on choices | V2 |
| Creator/editor tooling | V3 |

---

## Change History

### 2026-04-25 — Initial WBS
- Created from PRD (v1) and ADD (v1)
- 4 phases, 42 tasks, no High-complexity items
- All V2/V3 features explicitly deferred

### 2026-04-25 — Phase 1 progress update
- Tasks 1.1 through 1.6 completed: Vite + React + TS, Tailwind v3, Framer Motion, Howler, Press Start 2P, folder structure
- Tasks 1.7 and 1.8 reassigned to owner per [`AGENTS.md`](../../AGENTS.md) (no agent pushes, no agent-initiated deploy connect)
- Added "Current status" section and per-task status column
- Timeline milestones recorded in [`project_charter.md`](project_charter.md) §8

### 2026-04-26 — Scenario Variants + Progressive Difficulty
- Replaced single-scenario rooms with three difficulty variants per bias (15 scenarios total).
- Each run now picks one variant per bias and orders them easy → medium → hard with random tie-breaking.
- New `BiasRoom` / `RoomVariant` data shape; existing per-avatar overrides preserved on the easy variant for each bias.
- `RoomResult` now records `variantId` and `difficulty`.

### 2026-04-26 — Character + Learning Iteration
- Replaced five emoji avatar classes with four CSS pixel characters: Explorer, Spark, Guardian, Strategist.
- Added character stats, character-specific room variants, coaching lines, personalized recap copy, and a reduced-motion-aware journey path.
- Added distinct sprite layers for hair, outfit, accessory, and stance so the characters differ by costume and silhouette, not just palette.
- Updated PRD, ADD, scratchpad, and WBS to match the implemented direction.
