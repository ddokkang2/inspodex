# Inspodex

Inspodex is a static reference hub for browsing visual inspiration and jumping into external search. It groups references into six directories:

- Design styles
- Character styles
- Photo and lighting styles
- Artist styles
- Color palettes
- Pose and motion references

The app runs directly in the browser without a build step. Data is loaded from local `*-data.js` files, rendered into cards, and connected to external search targets such as Pinterest, Google Images, Behance, ArtStation, and Coolors depending on the active directory.

## Run locally

Open the site with a static server on port `8080` to match [`.vscode/launch.json`](/e:/@vscode/Inspodex/.vscode/launch.json):

```powershell
cd e:\@vscode\Inspodex
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Project structure

- [`index.html`](/e:/@vscode/Inspodex/index.html): page shell, search panel, external search UI, grid container, toast and popup
- [`script.js`](/e:/@vscode/Inspodex/script.js): directory switching, state, filtering, rendering, clipboard actions, external search URLs, generated SVG fallbacks
- [`styles.css`](/e:/@vscode/Inspodex/styles.css): layout and component styling
- [`reference-data.js`](/e:/@vscode/Inspodex/reference-data.js): curated runtime data for design, character, photo, and artist directories
- [`palettes-data.js`](/e:/@vscode/Inspodex/palettes-data.js): generated palette catalog
- [`poses-data.js`](/e:/@vscode/Inspodex/poses-data.js): generated pose catalog
- [`styles-data.js`](/e:/@vscode/Inspodex/styles-data.js), [`characters-data.js`](/e:/@vscode/Inspodex/characters-data.js), [`photo-data.js`](/e:/@vscode/Inspodex/photo-data.js): legacy source files retained in the repo but not loaded by `index.html`
- [`tools/`](/e:/@vscode/Inspodex/tools): thumbnail fetch and generation scripts

## Behavior summary

- `index.html` loads the data files first and [`script.js`](/e:/@vscode/Inspodex/script.js) last.
- `script.js` normalizes the active directory into a single in-memory `STYLES` list via `loadStyles()`.
- Search, tag filters, initials jump bars, palette and pose quick filters, prompt copying, and `localStorage` persistence all live in [`script.js`](/e:/@vscode/Inspodex/script.js).
- Grid rendering is incremental with `BATCH_SIZE = 40`.

## Current notes

- The source files are UTF-8. Earlier garbled Korean output came from terminal decoding, not from the sampled file contents.
- [`assets/artist-thumbs`](/e:/@vscode/Inspodex/assets) does not currently exist.
- [`assets/palette-thumbs`](/e:/@vscode/Inspodex/assets) does not currently exist.
- [`assets/pose-thumbs`](/e:/@vscode/Inspodex/assets) does not currently exist.
- Missing artist, palette, and pose thumbnails are handled by generated SVG fallback logic in [`script.js`](/e:/@vscode/Inspodex/script.js).

## SEO and deployment

If you deploy under a different domain, update these files:

- [`index.html`](/e:/@vscode/Inspodex/index.html)
- [`robots.txt`](/e:/@vscode/Inspodex/robots.txt)
- [`sitemap.xml`](/e:/@vscode/Inspodex/sitemap.xml)

The default production URL in the repo is `https://inspodex.vercel.app/`.

## More detail

Architecture and code flow notes are documented in [`ARCHITECTURE.md`](/e:/@vscode/Inspodex/ARCHITECTURE.md).
