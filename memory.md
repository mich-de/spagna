# Costa del Sol Dashboard — Session Log

## Project

Sol & Local — dashboard viaggio Costa del Sol (19–25 Giu 2026). Next.js 15, React 19, Tailwind v4, static export.

## Data architecture

13 JSON files in `data/`, one per category. Components import from `@/data/*.json`. No hardcoded travel content in JSX.

## Build gotchas (already fixed)

- **Tailwind v4** → `@import "tailwindcss"` in CSS, NOT `@tailwind` directives. Custom colors defined in `tailwind.config.ts`, loaded via `@config "../tailwind.config.ts"` in `globals.css`. Without this, ALL custom color classes silently produce no CSS → white-on-white.
- **PostCSS** → uses `@tailwindcss/postcss` plugin, not legacy `tailwindcss` package.
- **Fontsource v5** → import exact weight files (`400.css`), NOT bare `italic.css` (use `400-italic.css`).
- **tsconfig** → target `es2016` (needed for `Array.from(Set)`).
- **lucide-react** → camelCase: `Sunrise`, `Sunset`, NOT `SunRise`, `SunSet`.
- **Body hydration** → `suppressHydrationWarning` on both `<html>` and `<body>` because browser extensions (BIS) inject attributes that cause React hydration mismatch.

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

## AGENTS.md

Created with repo structure, tech stack, data conventions, and build gotchas. Includes table of 13 JSON files with their roles.
