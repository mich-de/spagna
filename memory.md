# Costa del Sol Dashboard — Session Log

## Project

Sol & Local — dashboard viaggio Costa del Sol (19–25 Giu 2026). Next.js 15, React 19, Tailwind v4, static export.

## Data architecture

13 JSON files in `data/`, one per category. Components import from `@/data/*.json`. No hardcoded travel content in JSX.

## Build gotchas (already fixed)

- **Tailwind v4** → `@import "tailwindcss"` in CSS, NOT `@tailwind` directives. Custom colors defined in `tailwind.config.mts`, loaded via `@config "../tailwind.config.mts"` in `globals.css`. Without this, ALL custom color classes silently produce no CSS → white-on-white.
- **PostCSS** → uses `@tailwindcss/postcss` plugin, not legacy `tailwindcss` package.
- **Fontsource v5** → import exact weight files (`400.css`), NOT bare `italic.css` (use `400-italic.css`).
- **tsconfig** → target `es2016` (needed for `Array.from(Set)`).
- **lucide-react** → camelCase: `Sunrise`, `Sunset`, NOT `SunRise`, `SunSet`.
- **Body hydration & Extension Mismatches** → Integrated a global inline script inside `RootLayout` (`app/layout.tsx`) that unbinds and dynamically removes the `bis_skin_checked` attribute (injected by Brave/extensions) before React hydrates, completely resolving Console/Runtime hydration warnings. Added `suppressHydrationWarning` on layout tags.
- **Webpack Cache Issues** → Webpack compiler cache lock errors (`TypeError: a[d] is not a function`) can be fixed by deleting the `.next` directory. Cleaned automatically via a `"predev"` hook in `package.json`, and explicitly added as a cleanup step in `start.bat` and `start.ps1` before starting dev mode.

## Data split

Original monolithic `trip.json` (1114 lines) → 13 category files split via Node script. Each component now imports only what it needs.

## Recommendation card redesign

Replaced simple gradient card with:
- SVG seal ("TOUR PICK") in corner
- Azulejo-inspired geometric pattern overlay
- Gold border accents
- Editorial heading with gradient text
- Animated badge pills with hover states

Fixed white-on-light issues: star icon `text-white` changed to `text-mare-900`, section label darkened from `terracotta-200` to `terracotta-300`.

## Launcher scripts

`start.bat` and `start.ps1` — kill ports 3000/3001 before starting dev server. Use plain ASCII art (avoids codepage corruption of box-drawing chars).

## Recent Polish & Features (2026-05-27)

- **Videos section**: Rendered 13 YouTube videos from `trip.json` with filtering by zone and type. External thumbnails load without iframes for optimized page load.
- **Visual Consistency**: Unified design layout by applying `card-shadow` and `card-hover` to all card lists (Food, BaseSelection, SanJuan, LocalExperiences, Logistics).
- **Documentation**: Updated `AGENTS.md` and created `GEMINI.MD`, `IMPLEMENTATION_PLAN.MD`, and `TASKS.MD` to preserve memory and follow local development workflows.
- **Cleanups**: Removed unused imports in `Budget.tsx` and resolved webpack compiler caches. Build now outputs 0 errors / 0 warnings.
