---
title: Bias Dungeon Product Requirements Document
type: prd
status: active
created: 2026-04-25
updated: 2026-04-26
tags: [game, browser, education, pixel-art, cognitive-bias]
---

# Product Requirements Document — Bias Dungeon

## 1. Product overview

Bias Dungeon is a pixel-art browser micro-game that teaches cognitive bias through short, relatable scenarios: online shopping, social media, gossip, navigation, and sunk-cost decisions. It is playful awareness and practical judgment practice. It is not compliance training, not clinical behavior change, and not brain training.

A single run takes five to ten minutes. Players move through a short dungeon of bias-themed rooms, pick a response to each scenario, and receive immediate feedback that names the bias and offers one concrete anti-bias move.

Related documents: architecture in [`ai_docs/core_docs/add.md`](ai_docs/core_docs/add.md), work breakdown in [`ai_docs/core_docs/wbs.md`](ai_docs/core_docs/wbs.md), locked decisions in [`ai_docs/scratchpad/add_scratchpad.md`](ai_docs/scratchpad/add_scratchpad.md).

## 2. Problem and vision

### Problem

People make biased decisions in everyday life. Most bias education is academic, passive, or too abstract to influence behavior in the moment. Gamified learning tends to drive higher engagement than non-gamified formats, and interactive bias learning performs better when it embeds real decision contexts and immediate feedback.

### Vision

The most memorable consumer-friendly micro-game for noticing how everyday judgment gets distorted. Each run leaves the player with one practical anti-bias move per scenario, delivered through humor, surprise, and situations players instantly recognize.

### Product thesis

If Bias Dungeon wraps real decision traps inside a short, friendly pixel-art adventure, players will engage, complete runs, and retain the lesson at higher rates than with static explainers or traditional educational content.

## 3. Objectives

- Help users recognize five to eight common biases from everyday life.
- Deliver one completed run in under ten minutes.
- Keep every room understandable without prior psychology knowledge.
- Produce a portfolio-ready prototype demonstrating the game loop, the pedagogy, and an AI-enhancement path.
- Generate qualitative reactions along the lines of "I do this too" and "this is actually useful".

### Non-goals

- Clinical behavior change claims.
- Enterprise LMS integration.
- Deep personalization or adaptive curriculum in V1.
- Real-time combat, platforming, or twitch mechanics.
- Long-form assessments, certification, or workplace compliance training.

## 4. Target personas

### Primary persona — Maya

- Age: 24 to 35.
- Profile: Curious, digitally fluent, likes quizzes and short games. Uses AI assistants and social platforms casually.
- Motivation: Wants to make smarter choices and avoid being fooled by her own first instinct.
- Need state: Wants something quick, fun, low-pressure, and useful rather than a lecture or dense article.
- Job to be done: "Help me notice when my brain is taking a shortcut in situations I actually face."

### Secondary persona — Leo

- Age: 18 to 28.
- Profile: Student or early-career knowledge worker. Enjoys indie and pixel-art games, likes interactive learning.
- Motivation: Wants a clever, shareable experience that feels like entertainment first and still teaches something real.
- Job to be done: "Give me a game I can finish in a few minutes and still remember later."

### User insight

The winning concept is a game-first experience built around everyday situations ordinary people recognize. Generic workplace AI literacy is weaker on this audience. The repeatable loop is: familiar situation, player choice, bias reveal, consequence, one practical defense.

## 5. User journeys

### 5.1 First-time run (happy path)

1. Player lands on the start screen and taps "Enter the Dungeon".
2. Player picks one of four pixel-art characters; the choice sets accent color and character-specific scenario framing.
3. Player enters room 1: sees a short scenario card and a pixel-art scene.
4. Player selects one of two or three responses.
5. Player sees the outcome, the bias name, a short plain-language explanation, and one anti-bias tip.
6. Player advances through the remaining rooms, five rooms total in MVP.
7. Player sees a recap screen showing every bias encountered and a one-line tip per bias.
8. Player can replay.

### 5.2 Returning player

1. Player starts a new run. Room order is reshuffled.
2. Player experiences familiar scenarios in a new sequence, finishes, and optionally shares or replays.

### 5.3 Abandon

1. Player closes the tab mid-run. No persistence in MVP. Next visit starts fresh.

## 6. Core experience

The dungeon is a sequence of short bias rooms. Each room presents an everyday scenario, offers two or three choices, reveals the mental trap involved, and names one tactic to avoid it next time. The tone is approachable, witty, and lightly game-like, with screen-by-screen interactions, no real-time gameplay.

### Launch room set

| Room | Bias | Everyday scenario | Learning outcome |
|---|---|---|---|
| Fake Sale Chamber | Anchoring | A large "discount" makes a price feel better than it is | Compare against true value, not the first number shown |
| Viral Panic Hall | Availability bias | One dramatic post makes a rare risk feel common | Check frequency and base rates before reacting |
| Gossip Mirror | Confirmation bias | A rumor fits your existing opinion about someone | Look for disconfirming evidence before judging |
| Oracle Route | Automation bias | An AI or app insists a route or answer is best while clues suggest otherwise | Treat AI as input, not authority |
| Sunken Treasure Pit | Sunk cost | You keep going because you already spent time or money | Decide based on future value, not past investment |

## 7. Functional requirements

### 7.1 User stories

- As a casual player, I want to understand the scenario quickly so I can make a choice without reading a lot.
- As a curious learner, I want to know why my choice was biased so I leave with a useful insight.
- As a replaying player, I want room order and flavor text to vary so the game stays interesting.
- As a portfolio reviewer, I want to see the product's core loop, target user, and educational value within a minute of loading.

### 7.2 Prioritized requirements (MoSCoW)

| Priority | Requirement |
|---|---|
| Must | Player can start a run in one click from the landing screen |
| Must | MVP ships with five fixed rooms |
| Must | Each room renders a scenario, two or three choices, an outcome, a bias reveal, and a takeaway |
| Must | End-of-run screen summarizes the biases encountered with one tip per bias |
| Must | Game works on desktop web; mobile web is acceptable (not optimized) |
| Should | Room order is shuffled at run start |
| Should | Four-character selection with pixel sprites, stat bars, accent colors, and character-specific coaching |
| Should | Sound effects and lightweight animation on transitions and reveals |
| Could | Optional free-text reasoning mode with AI feedback (deferred to V2) |
| Could | Daily challenge or shareable scorecard (deferred to V2 or V3) |

### 7.3 Content requirements

- Every scenario is recognizable within five seconds of reading.
- Every bias explanation stays under roughly one hundred words.
- Every room ends with one concrete "what to do instead" action.
- Scenarios avoid niche workplace or academic framing.
- Copy avoids heavy moralizing or clinical claims.

## 8. Non-functional requirements

| Area | Requirement | How it is measured |
|---|---|---|
| Performance | Initial page interactive in under three seconds on a typical home broadband desktop connection | Lighthouse Time to Interactive |
| Performance | Room-to-room transition under 250 ms | Manual timing during QA |
| Accessibility | Keyboard-navigable, visible focus states, reduced-motion support | axe-core pass plus manual keyboard run |
| Accessibility | Color never the only bias indicator (text plus icon present on every reveal) | QA checklist |
| Responsiveness | Desktop primary target, mobile web playable down to 375 px width | Manual test on iPhone SE dimensions |
| Reliability | Client-side only for MVP, no backend dependencies that can fail | Network inspector confirms zero API calls during a run |
| Cross-browser | Latest Chrome, Safari, Firefox on macOS; latest Chrome on mobile | Manual smoke test in each |
| Offline | Full run should work after initial load (static bundle) | Disable network post-load and complete a run |
| Analytics | No personal data collected in MVP | Privacy review |

## 9. Data requirements

All game content ships as static data in the bundle. No persistence or backend for MVP. See [`ai_docs/core_docs/add.md`](ai_docs/core_docs/add.md) §5 for the TypeScript definitions.

### Conceptual entities

- **Room:** title, bias name, scenario, two or three choices, a reveal (outcome, explanation, tip).
- **Choice:** text, flag for whether the option is biased.
- **Reveal:** outcome text, plain-language bias explanation, one concrete anti-bias tip.
- **Character:** name, short tagline, accent color token, pixel sprite palette, sprite style metadata, stat bars, brain habit, strength, watch-out copy, and recap insight. Four fixed characters: The Explorer, The Spark, The Guardian, The Strategist.
- **Run state (transient, in memory):** current phase, selected avatar, shuffled room queue, results list.

### Key business rules

- Room queue is generated once per run and persists for the duration of that run.
- Character choice affects visual accent, character-select presentation, scenario variants, reveal coaching, and recap insight. It does not change scoring or room order.
- A run is considered "completed" when all rooms have been answered and the recap screen has rendered.
- No data survives a page reload in MVP.

## 10. Interface requirements

### Visual and UX principles

- Concrete before concept: show the situation first, name the bias after the choice.
- Fun, not preachy: never make players feel stupid or morally judged.
- One lesson per room: short feedback beats dense explanation.
- Universal scenarios: prioritize shopping, news, friendships, travel, AI assistants, money and time tradeoffs.
- Friendly clarity: plain language, minimal psychology jargon.
- Retro pixel-art UI with dungeon framing and friendly traps and monsters.

### Screens (MVP)

- Start screen
- Avatar select screen
- Room screen (scenario + choices)
- Reveal screen (outcome, bias name, explanation, tip)
- Recap screen (all biases encountered, one tip per bias, "play again")

Detailed component and layout rules live in the architecture document.

## 11. Constraints

- Static site only. No backend, no database, no secrets in MVP.
- Deployment target is Vercel, auto-deployed from `main`.
- Free-tier friendly: audio assets under CC0 license (Kenney.nl), font from Google Fonts.
- Single language in MVP (English).
- Desktop web is the primary design target. Mobile web is acceptable, not optimized.

## 12. Assumptions

- Everyday bias scenarios are more relatable than job-specific training for the target audience.
- A playful wrapper increases willingness to engage with uncomfortable self-recognition.
- Short sessions complete at higher rates than long lessons.
- Pixel-art increases memorability and portfolio distinctiveness without requiring complex mechanics.
- Players understand character selection as a playful lens for learning, not a personality diagnosis.

## 13. Success metrics

### Product metrics

- Run start rate (visits that tap "Enter the Dungeon").
- Run completion rate (runs reaching the recap screen).
- Average session duration.
- Percentage of players completing at least three rooms.
- Replay rate within a single session or a return visit.

### Learning proxy metrics

- Self-reported "I recognized myself in this situation" score (post-run survey, later iteration).
- Self-reported "I learned something practical" score.
- Correct-answer delta if a short pre/post version is added later.

### Portfolio metrics

- Demoable in under sixty seconds.
- Visually distinct from standard AI or SaaS apps.
- Problem, persona, loop, and impact explainable in an interview setting.

## 14. Risks

| Risk | Why it matters | Mitigation |
|---|---|---|
| Too childish | Users dismiss it as not serious | Smart writing, tasteful retro art, practical takeaways |
| Too academic | Users bounce on heavy terminology | Reveal bias labels only after the choice, keep explanations under 100 words |
| Weak transfer | Players enjoy the game but do not retain the lesson | Every room ends with one concrete anti-bias move |
| Scenario mismatch | Players do not relate to the examples | Start with universal consumer-life situations |
| "Brain training" skepticism | Overclaiming hurts trust | Frame as awareness and practice, not cognitive repair |

## 15. Out of scope

- Multiplayer.
- Open-world exploration.
- Procedural dungeon generation in MVP.
- Advanced AI tutor agent in V1.
- Corporate admin dashboard.
- Certification and formal scoring validity claims.
- User accounts and persistent progress in MVP.

## 16. Release plan

### V1 prototype (MVP)

- Five rooms, one fully playable run.
- Pixel-art UI with avatar selection.
- Clear feedback and recap.
- Browser demo on Vercel, suitable for portfolio case study.

### V2

- Ten to fifteen rooms with scenario variations.
- Optional free-text reasoning mode with AI feedback.
- Adaptive recap based on common mistakes.
- Shareable scorecard.

### V3

- Themed packs (money, relationships, media literacy, AI trust).
- Light social or share features.
- Creator or editor tooling for adding rooms.

## 17. Open questions

- Tone direction: cozy-comedic or slightly darker fantasy?
- Progression structure: lives or health bar, or purely narrative?
- Recap framing: "biases you met" or "traps your brain likes"?
- If AI feedback lands in V2, should it appear as an in-world guide character or stay invisible?
- Custom domain for the portfolio deploy, or stay on the default `.vercel.app` URL?
