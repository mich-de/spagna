# Costa del Sol Travel Dashboard

Static Next.js 15 dashboard — premium travel guide for Costa del Sol (19–25 Jun 2026).

## Commands

```bash
npm run dev     # dev at http://localhost:3000 (predev hook auto-deletes .next)
npm run build   # production build, static export to out/
```

No test / lint / typecheck scripts exist.

## Data

All content in `data/*.json`, imported by components from `@/data/*.json`. Edit JSON, not JSX.

| File | Content |
|------|---------|
| `trip.json` | Trip metadata + YouTube videos[] |
| `recommended-base.json` | Final base recommendation |
| `bases.json` | 5 base comparison array |
| `itinerary.json` | 7-day program |
| `san-juan.json` | 23→24 June event |
| `beaches.json` | 12+ beaches |
| `restaurants.json` | 15+ restaurants |
| `nightlife.json` | Nightlife zones |
| `attractions.json` | Museums/sights |
| `food.json` | 15+ typical dishes |
| `local-experiences.json` | 15+ experiences |
| `logistics.json` | Car rental, parking, driving times |
| `budget.json` | 3 spending levels |

## Tech stack

- **Next.js 15** (App Router, static export via `next.config.js` `output: 'export'`)
- **React 19** — all interactive components are `'use client'`
- **Tailwind v4** — uses `@import "tailwindcss"` + **`@config`** in `globals.css` (see gotcha below)
- **Framer Motion** for animations (`whileInView` + `viewport={{ once: true }}`)
- **Recharts** for budget bar charts
- **Lucide React** for icons (camelCase: `Sunrise`, `Sunset` — NOT `SunRise`, `SunSet`)

## Critical gotchas

- **Tailwind v4 `@config`**: `tailwind.config.mts` is NOT auto-loaded. `globals.css` MUST have `@config "../tailwind.config.mts"` right after `@import "tailwindcss"`. Missing it → all custom color classes (`text-notte`, `bg-terracotta-*`, etc.) silently produce zero CSS → invisible text.
- **Fontsource v5**: Import exact weight files (`400.css`, `700.css`), NOT `italic.css` — use `400-italic.css`.
- **`tsconfig.json` targets `es2016`** — needed for `Array.from(Set)` iteration.
- **Hydration mismatches**: Browser extensions (Brave, adblockers) inject `bis_skin_checked` attributes. Root layout has an inline `<script>` that scrubs these via MutationObserver. Keep `suppressHydrationWarning` on `<html>` and `<body>`.
- **Webpack compiler crashes**: Delete `.next` or use `npm run dev` (predev hook does it). `start.bat`/`start.ps1` also kill ports 3000/3001 before starting.
- **PostCSS**: Uses `@tailwindcss/postcss` plugin, not legacy `tailwindcss` package.

## Architecture

- Single-page dashboard: `page.tsx` renders 11 sections with scroll-spy (IntersectionObserver) + sticky `SectionNav`
- Sections in order: overview, videos, base, itinerary, beaches, food, nightlife, sanjuan, experiences, logistics, budget
- No API routes, no database, no state management
- JSON data uses `any` casts in `.map()` callbacks (no TypeScript types for data)
- `next.config.js`: `basePath: '/spagna'` in production for GitHub Pages

## Code conventions

- `'use client'` on all components
- `<section id="...">` with `scroll-mt-20` for anchor offset
- Cards: `card-shadow card-hover` classes (Airbnb-inspired three-layer shadow)
- Text: always explicit color class (never rely on inheritance; `text-mare-700/70` minimum)
- Animations: `motion.div` with `whileInView`, `viewport={{ once: true }}`, staggered `transition.delay`
- `lucide-react` imports: camelCase (`Menu`, `X`, `Play`, `MapPin`, etc.)

## Deployment

- **GitHub Actions** (`.github/workflows/pages-deploy.yml`): push to `main` → `npm ci` + `npm run build` → deploy `out/` to GitHub Pages
- `basePath: '/spagna'` only active when `NODE_ENV=production`
- Static export: all images unoptimized, `output: 'export'` in config
