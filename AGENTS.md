# Costa del Sol Travel Dashboard

Static Next.js 15 dashboard — premium travel guide for Costa del Sol (19–25 Jun 2026).

## Commands

```bash
npm run dev     # dev at http://localhost:3000 (predev hook auto-deletes .next)
npm run build   # clean + next build → static export to out/
npm run clean   # rimraf .next out node_modules/.cache
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
| `boat-tours.json` | Boat tours & catamarans |
| `water-activities.json` | Kayak, hiking itineraries (Wikiloc) |
| `restaurants.json` | 15+ restaurants |
| `food.json` | 15+ typical dishes |
| `nightlife.json` | Nightlife zones |
| `markets.json` | Weekly markets |
| `attractions.json` | Museums/sights |
| `local-experiences.json` | 15+ experiences |
| `logistics.json` | Car rental, parking, driving times |
| `budget.json` | 3 spending levels |
| `expenses.json` | Expense tracking |
| `accommodations.json` | Accommodation data |
| `movida-over35.json` | Over-35 nightlife & dating guide |

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
- **No TypeScript types for JSON data** — all data imports use `any` casts in `.map()` callbacks.

## Architecture

- Single-page dashboard: `page.tsx` renders 15 sections with scroll-spy (IntersectionObserver) + sticky `SectionNav`
- Sections in order: overview, single-guide, base, inspiration, videos, beaches, boat-tours, water-activities, food, markets, nightlife, sanjuan, experiences, pretrip-checklist, logistics, expenses, budget
- Dedicated itinerary page: `/itinerary` (separate route, reuses `Itinerary` component)
- **TripPlanner** ("Il Mio Piano"): floating drawer syncing via `localStorage` + `CustomEvent('sol-local-planner-update')`. BaseSelection shares selected base state through the same mechanism.
- **PasswordWall**: client-side SHA-256 hash auth. Hash hardcoded in `PasswordWall.tsx:5` and `page.tsx:41`.
- No API routes, no database, no state management library
- `next.config.js`: `basePath: '/spagna'` only active when `GITHUB_ACTIONS === 'true'`

## Code conventions

- `'use client'` on all components
- `<section id="...">` with `scroll-mt-20` for anchor offset
- Cards: `card-shadow card-hover` classes (Airbnb-inspired three-layer shadow)
- Text: always explicit color class (never rely on inheritance; `text-mare-700/70` minimum)
- Animations: `motion.div` with `whileInView`, `viewport={{ once: true }}`, staggered `transition.delay`
- `lucide-react` imports: camelCase (`Menu`, `X`, `Play`, `MapPin`, etc.)

## Known duplicated code

Extract before adding new features:

- **Ambient mesh gradients** — identical in `page.tsx:106-133` and `itinerary/page.tsx:50-77`. Extract to `AmbientGradients.tsx`.
- **Footer** — identical in `page.tsx:173-188` and `itinerary/page.tsx:86-101`. Extract to `Footer.tsx`.
- **Auth check** — duplicated `sol-auth` hash logic in `page.tsx:40-44` and `itinerary/page.tsx:19-24`. Extract to `useAuth()` hook.

## Deployment

- **GitHub Actions** (`.github/workflows/pages-deploy.yml`): push to `main` → `npm ci` + `npm run build` → deploy `out/` to GitHub Pages
- `basePath: '/spagna'` only active when `GITHUB_ACTIONS === 'true'`
- Static export: all images unoptimized, `output: 'export'` in config
