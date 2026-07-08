# Inspodex

Inspodex is an AI-friendly visual reference workspace for solo creators and freelance designers. It helps users explore references across styles, palettes, lighting, poses, and artists, then move those references into project boards, comparison views, and exportable prompt/search packs.

The product is intentionally positioned as a workspace, not just a browsing archive. The core loop is:

1. Explore references
2. Save cards into a board
3. Compare and compress the direction
4. Export prompts, search packs, or notes into the next tool

## What is in the repo

- `index.html`: landing page and product entry
- `app.html`: focused workspace surface for browsing, saving, comparing, and exporting references
- `script.js`: application state, directory switching, filtering, board behavior, compare logic, export actions, clipboard actions, and persistence
- `styles.css`: main visual system and UI styling
- `persona-feedback.html`: research-style persona feedback board
- `persona-feedback.js`: persona simulation data and infographic rendering logic
- `persona-feedback.css`: persona feedback board styling
- `reference-data.js`, `palettes-data.js`, `poses-data.js`: runtime reference catalogs used by the app
- `inspodex-core.js`: core helpers used by tests
- `test/inspodex-core.test.js`: lightweight automated test coverage

## Product direction

Current strategy documents in the repo:

- [`PRODUCT_STRATEGY.md`](/Users/macmini/Vibecoding/inspodex/PRODUCT_STRATEGY.md)
- [`POSITIONING_MVP_PLAN.md`](/Users/macmini/Vibecoding/inspodex/POSITIONING_MVP_PLAN.md)
- [`SITE_DIRECTION_BLUEPRINT.md`](/Users/macmini/Vibecoding/inspodex/SITE_DIRECTION_BLUEPRINT.md)
- [`.agents/product-marketing-context.md`](/Users/macmini/Vibecoding/inspodex/.agents/product-marketing-context.md)

The current recommended direction is:

> Inspodex = a visual direction workspace for AI-based creators who need to move from scattered references to workable boards and prompts quickly.

## Run locally

Because the project is static, any simple local server works.

```bash
cd /Users/macmini/Vibecoding/inspodex
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Current page structure

- `/`: landing page
- `/app.html`: workspace
- `/persona-feedback.html`: persona simulation and research board

## Key behavior summary

- `app.html` loads the data files first and `script.js` last
- `script.js` normalizes the active directory into a single in-memory list via `loadStyles()`
- search, filters, jump bars, board persistence, compare logic, export helpers, and theme persistence live in `script.js`
- the reference grid renders incrementally with `BATCH_SIZE = 40`

## Development notes

- The app runs directly in the browser without a build step
- Data is stored in local `*-data.js` files
- Local persistence relies on `localStorage`
- Missing thumbnails fall back to generated SVG assets when needed

## Data pipeline (v0.5.0)

Reference metadata is now baked at build time instead of derived at runtime:

```bash
npm run bake   # tools/build-reference-index.mjs
```

- `data/references.json`: full ReferenceItem catalog. Edit this (or the upstream `*-data.js`) and re-run bake. Prompt templates here are meant to be human-reviewed.
- `data/references-index.js`: runtime overlay loaded before `script.js`. When present, `enrichStyle()` prefers baked fields (aliases, moods, useCases, eras, regions, media, overview, relatedIds, promptTemplate) over runtime heuristics.
- Related references (same-type + cross-type) are precomputed into `relatedIds` and power the detail panel sections.

## Metrics (v0.5.0)

`analytics.js` records local, privacy-friendly usage events (no server). In DevTools:

```js
InspodexMetrics.summary()     // 보드 생성/저장/Export/외부검색/재방문 요약
InspodexMetrics.exportJson()  // JSON 다운로드
```

Set `window.INSPODEX_METRICS_ENDPOINT` to forward events via `sendBeacon` when a backend exists.

## Deployment

If you deploy under a different domain, update:

- [`index.html`](/Users/macmini/Vibecoding/inspodex/index.html)
- [`app.html`](/Users/macmini/Vibecoding/inspodex/app.html)
- [`robots.txt`](/Users/macmini/Vibecoding/inspodex/robots.txt)
- [`sitemap.xml`](/Users/macmini/Vibecoding/inspodex/sitemap.xml)

The current production URL in the repo is `https://inspodex.vercel.app/`.

## Architecture reference

More implementation detail lives in [`ARCHITECTURE.md`](/Users/macmini/Vibecoding/inspodex/ARCHITECTURE.md).
