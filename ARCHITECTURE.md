# Inspodex Architecture

## Summary

Inspodex is a static single-page app. The browser loads HTML, CSS, three data sources, and one main script. The app then builds a directory-specific `STYLES` collection in memory and renders cards into an infinite-scroll style grid.

## Boot and load order

[`index.html`](/e:/@vscode/Inspodex/index.html) loads assets in this order:

1. [`reference-data.js`](/e:/@vscode/Inspodex/reference-data.js)
2. [`palettes-data.js`](/e:/@vscode/Inspodex/palettes-data.js)
3. [`poses-data.js`](/e:/@vscode/Inspodex/poses-data.js)
4. [`script.js`](/e:/@vscode/Inspodex/script.js)

`DOMContentLoaded` in [`script.js`](/e:/@vscode/Inspodex/script.js) calls `init()`, which:

- reads persisted theme, directory, active site, shuffle state, and query-related state from `localStorage`
- binds UI events
- applies the active directory and theme
- loads the active dataset through `loadStyles()`
- renders filters, cards, and helper UI

## Main subsystems

### 1. Data loading and normalization

`loadStyles()` selects one of these globals based on `directoryMode`:

- `window.STYLES_DATA`
- `window.CHAR_STYLES_DATA`
- `window.PHOTO_STYLES_DATA`
- `window.ARTIST_STYLES_DATA`
- `window.PALETTES_DATA`
- `window.POSES_DATA`

Each raw item passes through `enrichStyle()`, which derives:

- `tags`
- `overview`
- `figures`
- `characteristics`
- normalized `q`
- normalized palette colors when the directory is `palette`

This creates a common shape for filtering and rendering.

### 2. Directory-specific UI

`applyDirectory()` is the main mode switch. It:

- sets `directoryMode`
- resets incompatible filters from the previous mode
- updates the title and placeholder text
- changes available search sites
- toggles recommended link blocks
- reloads intent chips and prompt presets
- clears selected card state and manual search state

Mode-specific filters:

- `pose`: pose type and variant quick filters
- `palette`: category and preset quick filters
- `character`: medium/style facet quick filters
- `all`: shared type, mood, use, and era facets
- `design`, `character`, `photo`, `artist`: initials jump bars where applicable

### 3. Filtering and sorting

The final visible item list is built in `render()` by combining:

- text query matching through `matchesScope()`
- initials filtering through `matchesInitials()`
- pose quick filters
- character quick filters
- palette quick filters
- active tag filtering
- optional shuffle ordering
- Korean or English sorting

`buildJumpBars()` recalculates quick-filter counts from the current filtered base set so the UI reflects the current search scope.

### 4. Card rendering and load-more behavior

Cards are built by `createStyleCard()`. Each card can include:

- thumbnail image
- Korean and English labels
- tags
- prompt copy action
- palette HEX copy buttons for palette entries

Rendering uses batched append with `BATCH_SIZE = 40`. `appendNextBatch()` and an `IntersectionObserver` drive progressive loading.

### 5. External search and clipboard behavior

`SITES` defines outbound URL builders. The list of available sites changes with the active directory.

Card click behavior:

- selects the style
- derives the effective query from the card's `q`, labels, and optional intent token
- updates the manual search field
- keeps the search target site ready for immediate open

Clipboard behavior:

- `writeClipboard()` handles prompt and HEX copy actions
- `showToast()` and `showPopup()` provide UI feedback

### 6. Thumbnail fallback generation

If local image assets are missing, [`script.js`](/e:/@vscode/Inspodex/script.js) generates SVG data URIs for:

- design entries
- character entries
- artist entries
- palette entries
- pose entries

This is especially relevant right now because `assets/artist-thumbs`, `assets/palette-thumbs`, and `assets/pose-thumbs` are not present in the repository.

## Data files

- [`reference-data.js`](/e:/@vscode/Inspodex/reference-data.js): curated runtime catalog for design, character, photo, and artist directories
- [`palettes-data.js`](/e:/@vscode/Inspodex/palettes-data.js): generator-based palette catalog
- [`poses-data.js`](/e:/@vscode/Inspodex/poses-data.js): generated set of 260 pose references from archetype and variant combinations
- [`styles-data.js`](/e:/@vscode/Inspodex/styles-data.js), [`characters-data.js`](/e:/@vscode/Inspodex/characters-data.js), [`photo-data.js`](/e:/@vscode/Inspodex/photo-data.js): legacy source files currently retained for reference only

## Verified observations

- [`index.html`](/e:/@vscode/Inspodex/index.html) does load data files before [`script.js`](/e:/@vscode/Inspodex/script.js).
- `loadStyles()` in [`script.js`](/e:/@vscode/Inspodex/script.js) does map each `directoryMode` to the expected global dataset.
- UTF-8 reads of sampled files display Korean correctly in PowerShell when `-Encoding UTF8` is specified.
- The earlier garbled output appears to be a shell decoding issue, not confirmed source corruption.

## Current risks

- [`script.js`](/e:/@vscode/Inspodex/script.js) is large and centralizes most behavior, which raises change risk and review cost.
- Directory-specific UI logic and data normalization are tightly coupled in one file.
- Thumbnail asset coverage is uneven across directories, increasing reliance on runtime SVG fallback generation.
- Korean text display should still be spot-checked in the browser because terminal output alone is not a reliable encoding check.

## Suggested next steps

- Split [`script.js`](/e:/@vscode/Inspodex/script.js) by subsystem: data loading, filtering, rendering, clipboard/external search, and thumbnail generation.
- Decide whether palette and pose thumbnails should remain generated at runtime or be committed as static assets.
- Validate Korean copy directly in the browser and, if needed, standardize editor and terminal encoding settings.
