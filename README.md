# Bias Dungeon

A pixel-art browser game about cognitive biases. Players move through five themed rooms, make a choice in each, and get a short lesson about the bias their choice did (or didn't) trigger.

See the source docs for more:
- Product requirements: [`ai_docs/bias-dungeon-prd.md`](ai_docs/bias-dungeon-prd.md)
- Architecture: [`ai_docs/core_docs/add.md`](ai_docs/core_docs/add.md)
- Work breakdown: [`ai_docs/core_docs/wbs.md`](ai_docs/core_docs/wbs.md)

## Stack

- React + Vite + TypeScript
- Tailwind CSS (custom pixel palette)
- Framer Motion (screen transitions + reveals)
- Howler.js (retro sound effects)
- Press Start 2P + Inter (Google Fonts)
- Deployed as a static site to Vercel

## Local development

```bash
npm install
npm run dev      # start the Vite dev server
npm run build    # type-check + production build
npm run preview  # serve the built app locally
npm run lint     # run ESLint
```

## Status

Phase 1 (Foundation) scaffold complete. See the WBS for the full roadmap.
