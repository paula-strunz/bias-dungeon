---
title: Bias Dungeon Project Charter
type: charter
status: active
created: 2026-04-25
updated: 2026-04-25
tags: [portfolio, game, browser, pixel-art, cognitive-bias]
---

# Project Charter — Bias Dungeon

## 1. Executive summary

Bias Dungeon is a pixel-art browser micro-game that teaches cognitive bias through five short, relatable scenarios. A full run takes five to ten minutes. This charter frames the project as a **portfolio piece**, built solo in a one-week sprint, deployed as a static site to Vercel. No monetization, no user accounts, no backend.

Supporting documents: [`prd.md`](prd.md), [`add.md`](add.md), [`wbs.md`](wbs.md). Agent conventions live in [`AGENTS.md`](../../AGENTS.md).

## 2. Vision

Build the most memorable consumer-friendly micro-game for noticing how everyday judgment gets distorted. Each run leaves the player with one practical anti-bias move per scenario, delivered through humor, surprise, and situations players instantly recognize. The portfolio angle: a shippable, visually distinctive artifact that demonstrates product thinking, game-loop design, and clean front-end execution in under sixty seconds.

## 3. Objectives and success criteria

### Primary objective

Ship a demoable V1 prototype to Vercel within one week of 2026-04-25. A complete run (start, avatar select, five shuffled bias rooms, recap) plays end-to-end with immediate feedback after every choice.

### Secondary objectives

- Position the project as portfolio-worthy: easy to link, loads fast, visually distinct from standard SaaS UIs.
- Demonstrate that every room teaches one concrete anti-bias move, not an academic lesson.
- Keep the implementation small enough that a recruiter or peer can read the code in one sitting.

### Success criteria (measurable)

| Criterion | Target |
|---|---|
| V1 live on Vercel | By 2026-05-02 |
| Full run completable in Chrome, Safari, Firefox (latest on macOS) | All three pass |
| Initial page interactive | Under 3 seconds on typical home broadband |
| Lighthouse accessibility score | At least 90 |
| Code readable end-to-end in one review session | Under ~1,500 lines of product code (excluding data) |
| Qualitative reaction from peer review | At least two testers say "I do this too" or "this is useful" |

Product and learning-proxy metrics are defined in [`prd.md`](prd.md) §13 and are not repeated here.

## 4. Stakeholders

| Role | Who | Involvement |
|---|---|---|
| Owner, builder, designer | Paula (solo) | All decisions, all implementation |
| Informal reviewers | Friends and peers | Playtest the V1 build, give qualitative feedback |
| Future audience | Recruiters, hiring managers, portfolio visitors | Read-only; judge the end artifact |
| Target players (personas) | Maya, Leo (see [`prd.md`](prd.md) §4) | Playtest subjects, not stakeholders in the formal sense |

No clients, no employer involvement, no formal advisors.

## 5. Market and competitive positioning

Portfolio context, so "market" is loose: the goal is standing out among other portfolio projects shown to technical and product-oriented reviewers.

- **Positioning:** A novel pixel-art micro-game framing cognitive bias as a playable dungeon. No direct competitor exists in this exact form factor (short, browser-based, CSS pixel-art, bias-specific).
- **Adjacent categories:** Bias explainers in articles and videos, psych-oriented quiz apps, Duolingo-style micro-learning apps, corporate L&D training.
- **Differentiation:** Game-first loop over quiz or Q&A. Everyday consumer scenarios over workplace or academic framing. One concrete tactic per room over theory. Retro aesthetic over SaaS polish.

No competitor analysis section is required beyond this.

## 6. Risks

Product-level risks and mitigations are in [`prd.md`](prd.md) §14. The charter adds project-execution risks specific to the one-week sprint.

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Scope creep during build (extra rooms, polish loops) | High | Slips the week | Freeze scope at the five MVP rooms in `prd.md`. V2 features stay untouched. |
| Content-writing bottleneck (five scenarios + reveals + tips) | Medium | Stalls Phase 2 | Write all five rooms in one dedicated session, not spread across the week. Use a shared template per room. |
| State machine regressions between screens | Medium | Breaks the loop late in the week | Build state machine first (Phase 3A) before any screens, with a visible phase indicator during dev. |
| Mobile layout drifts on small screens | Medium | Degrades portfolio impression | Test at 375 px width from Phase 2 onward, not only in Phase 4. |
| Vercel deploy problem on first push | Low | Half a day lost | Complete Phase 1 exit criteria (blank app deploys) before writing any real code. |
| Asset licensing oversight (sounds, font) | Low | Has to swap assets late | Lock in CC0 Kenney.nl pack and Press Start 2P (Google Fonts) up front; note license in repo. |

## 7. Resource constraints

- **Time:** One calendar week of evening and weekend sessions. Approximate capacity: four to six focused sessions.
- **Budget:** Zero. Vercel free tier, Google Fonts, Kenney.nl CC0 audio, no paid APIs.
- **People:** Solo.
- **Tools:** Existing laptop and editor setup. No new licenses.
- **External services:** GitHub (free), Vercel (free).

## 8. Timeline and milestones

Target launch window: 2026-05-01 to 2026-05-02. Phases follow [`wbs.md`](wbs.md).

| Milestone | Target date | Source |
|---|---|---|
| Phase 1: Foundation complete (Vite + Tailwind + Framer + Howler + scaffold) | 2026-04-25 (**done**) | WBS Phase 1 |
| Phase 2: Design system + all 5 room contents + avatars | 2026-04-27 | WBS Phase 2 |
| Phase 3: State machine + all 5 screens + transitions | 2026-04-30 | WBS Phase 3 |
| Phase 4: Polish, a11y, cross-browser, mobile, final deploy | 2026-05-01 | WBS Phase 4 |
| V1 launch + peer playtest | 2026-05-02 | Exit of Phase 4 |

Flex built into the final day for unknown issues.

## 9. Regulatory and compliance

- **No personal data collected.** No accounts, no cookies, no analytics in MVP.
- **Licensing:** Kenney.nl game audio (CC0, no attribution required), Press Start 2P and Inter (Google Fonts, free for commercial use), Framer Motion and Howler.js (MIT). No proprietary assets.
- **Accessibility:** Targets WCAG AA for keyboard navigation, focus states, reduced motion, and non-color bias indicators. Not formally certified.
- **Not making medical, clinical, or therapeutic claims** about cognitive bias reduction.

## 10. Ethical considerations

- **No overclaiming.** The game is framed as awareness and practice, not cognitive repair or therapy.
- **No dark patterns.** No streaks, guilt loops, or forced retention. Replay is always optional.
- **Respectful framing.** Scenarios and copy avoid making the player feel stupid or morally judged.
- **No hidden data collection.** Static bundle, no telemetry.
- **Representation.** Scenarios draw from everyday consumer life; written to stay inclusive across age, background, and familiarity with psychology.

## 11. Future growth

V1 is a self-contained prototype. Growth paths are deferred to V2 and V3 and are listed in [`prd.md`](prd.md) §16.

Charter-level notes on scalability: the game is client-only and static, so scaling is free up to Vercel's free-tier limits. Adding rooms is an append-only change in `src/data/rooms.ts`. No architectural refactor is needed to get from 5 to ~15 rooms.

## 12. Immediate next steps

1. **Initial commit + GitHub + Vercel.** Owner runs `gh repo create`, pushes the Phase 1 scaffold, and connects Vercel. Confirms the blank app is live.
2. **Start Phase 2A (Design System).** Tasks 2.1 through 2.6 in [`wbs.md`](wbs.md). Build PixelButton, PixelCard, ProgressBar, pixel border utilities.
3. **Write all 5 rooms in one session.** Tasks 2.9 through 2.13. Use a shared per-room template: scenario (under 3 sentences), 2-3 choices (one biased), outcome, explanation (under 100 words), tip.
4. **Download and organize Kenney.nl sound assets.** Task 2.14.
5. **Peer review gate.** Before Phase 3 state machine work, re-read all five rooms. Cut anything that is preachy, academic, or niche.
