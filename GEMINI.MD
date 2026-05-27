# GEMINI.MD — Persistent Memory Log

## Project Overview

Costa del Sol Travel Dashboard — "Sol & Local" — a premium static Next.js 15 dashboard for a 7-day trip to southern Spain (19-25 June 2026). All content from JSON data files, no API routes.

## Key Architectural Decisions

### Tailwind v4 + `@config` (Critical)
- **Decision**: Use `@config "../tailwind.config.mts"` in `globals.css` right after `@import "tailwindcss"`.
- **Why**: Tailwind v4 does NOT auto-load config files. Without `@config`, all custom color classes (`text-notte`, `bg-terracotta-*`, `text-mare-*`, etc.) silently produce NO CSS → white-on-white text.
- **Fixed in session**: 2026-05-26. Root cause of initial "bianco su bianco" report.

### Config file renamed `.ts` → `.mts`
- Config renamed from `tailwind.config.ts` to `tailwind.config.mts` (ESM module).
- CSS reference updated accordingly.

### Design System
- **Color palette**: sabbia (bg), terracotta (accent), mare (info/cool), oro (gold), notte (dark text), crema (warm light)
- **Shadows**: Three-layer Airbnb-inspired `card-shadow` class in CSS
- **Glass**: `glass` class for glassmorphism (backdrop-blur + semi-transparent bg)
- **Badge**: `badge-pill` class for consistent pill-style badges
- **Typography**: Playfair Display (headings), DM Sans (body)

### Data Architecture
- All content in `data/*.json` — 13 files
- Components import directly from JSON, no state management
- `trip.json` enriched with `videos[]` array (13 YouTube videos) — used by `Videos.tsx`
- All location data includes `mapLink` and `tripadvisorLink` for external links

## Session History

### 2026-05-26 — Initial fix
- Fixed white-on-white text by adding `@config` directive to `globals.css`
- Identified and fixed bare `text-xs` without color classes in Logistics.tsx

### 2026-05-27 — Production polish
- Cleaned unused imports from Budget.tsx (PieChart, Pie, Sector, DollarSign)
- Created Videos.tsx component (filterable YouTube grid, no iframes)
- Added Videos to SectionNav and page.tsx scroll-spy
- Hardened text contrast in Nightlife.tsx strategy panel
- Added card-shadow to Food, BaseSelection, SanJuan, LocalExperiences, Logistics
- Updated AGENTS.md with current architecture
- Created this GEMINI.MD

## Known Gotchas

1. **Tailwind v4 `@config`**: Must be present. See above.
2. **Fontsource v5**: Import `400-italic.css`, not `italic.css`
3. **Bundle note**: Page is ~177 kB (279 kB first load). YouTube thumbnails are external images, not bundled.
4. **Port**: Dev server may use 3001 if 3000 is occupied.
