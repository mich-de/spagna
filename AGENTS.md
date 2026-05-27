# Costa del Sol Travel Dashboard

## Quick start

```bash
npm run dev     # dev server at http://localhost:3000
npm run build   # production build
```

Or double-click `start.bat` / `start.ps1`.

## Data

All content lives in `data/*.json` — one file per category. Add or edit data in the JSON files, not in components. Components only import from `@/data/*.json`.

| File | Ruolo |
|------|-------|
| `trip.json` | Metadati viaggio: date, arrivo, trasporto, meteo, badges, videos[] (YouTube) |
| `recommended-base.json` | Raccomandazione finale base ({winner, reason, alternatives}) |
| `bases.json` | Array confronto basi: score, pro/cons, distanze, parcheggio, nightlife |
| `itinerary.json` | Array 7 giorni: programma mattina→notte, ristoranti, tempi, livello energia |
| `san-juan.json` | Evento 23→24 giugno: piano ora-ora, spot consigliati, cosa portare |
| `beaches.json` | Array 12 spiagge: atmosfera, parcheggio, chiringuiti, tip |
| `restaurants.json` | Array 15 ristoranti: zona, tipo, prezzo, specialità, prenotazione |
| `nightlife.json` | Array 5 zone notte: venue, orari, dress code, facilità socializzare |
| `attractions.json` | Array musei/luoghi: durata, costo, abbinamento ideale |
| `food.json` | Array 15 piatti tipici: descrizione, abbinamento, autenticità score |
| `local-experiences.json` | Array 15 esperienze da locale: dove, quando, costo, tip |
| `logistics.json` | Guida auto: noleggio, parcheggi, tempi guida, mobilità notturna |
| `budget.json` | 3 livelli spesa (medio/comfort/premium) con breakdown categorie |

## Tech stack

- **Next.js 15** (App Router, static export)
- **React 19** with client components (`'use client'` in all interactive files)
- **Tailwind v4** — uses `@import "tailwindcss"` + `@config "../tailwind.config.mts"` in `globals.css`, NOT `@tailwind` directives. Custom colors/fonts are defined in `tailwind.config.mts` and loaded via the `@config` directive.
- **Fonts**: Playfair Display (headings), DM Sans (body) — imported via `@fontsource` packages in `globals.css`
- **Recharts** for budget bar charts
- **Framer Motion** for animations (`framer-motion`)
- **Lucide React** for icons

## Build gotchas

- **⚠️ Tailwind v4 `@config` is MANDATORY**: `tailwind.config.mts` is **NOT** auto-loaded in v4. You MUST have `@config "../tailwind.config.mts"` in `globals.css` right after `@import "tailwindcss"`. Without it, ALL custom color classes (`text-notte`, `bg-terracotta-*`, `text-mare-*`, `bg-crema`, `text-oro`, etc.) silently produce NO CSS → text becomes invisible (white on white).
- Tailwind v4 + PostCSS: PostCSS config uses `@tailwindcss/postcss` plugin, not the legacy `tailwindcss` package directly.
- Fontsource v5: import exact weight files (`400.css`, `700.css`), NOT `italic.css` (use `400-italic.css`).
- `tsconfig.json` targets `es2016` — needed for `Array.from(Set)` iteration.
- The workspace root warning from Next.js about multiple lockfiles is harmless; suppress via `outputFileTracingRoot` in `next.config.js` if desired.

## Structure

```
app/
├── layout.tsx          # root HTML + metadata
├── page.tsx            # main dashboard — scroll spy nav + section components
├── globals.css         # fonts + Tailwind v4 + custom classes
└── components/
    ├── SectionNav.tsx  # sticky nav with mobile menu + sliding indicator
    ├── Overview.tsx    # hero + badges + recommendation card
    ├── Videos.tsx      # YouTube video grid with zone/type filters
    ├── BaseSelection.tsx
    ├── Itinerary.tsx   # accordion timeline (7 days)
    ├── Beaches.tsx     # filterable cards + Maps/TA links
    ├── Food.tsx        # dishes + restaurants + Maps/TA links
    ├── Nightlife.tsx   # venues + Maps/TA links
    ├── SanJuan.tsx     # 23→24 June event + Maps/TA links
    ├── LocalExperiences.tsx  # + Maps/TA links
    ├── Logistics.tsx
    └── Budget.tsx      # Recharts bar chart
data/                   # 13 JSON files, one per category
```

## Conventions

- Components are all client components (`'use client'`).
- Data flows one way: `data/*.json` → component import → render.
- No API routes, no database. Static export.
- No TypeScript types for JSON data — use `any` casts in `.map()` callbacks.
- Animations: `framer-motion` with `whileInView` + `viewport={{ once: true }}`.
- Icons: import from `lucide-react` (camelCase: `Sunrise`, `Sunset`, not `SunRise`, `SunSet`).
- **Text contrast**: Always use explicit text color classes on `<p>`, `<span>`, etc. — never rely on inheritance. Bare `text-xs` or `text-sm` without a color class is a smell. Use at minimum `text-mare-700/70` or a contextual color matching the parent `bg-*`.
- **Card shadows**: All interactive cards should use `card-shadow card-hover` classes for visual consistency. The `card-shadow` provides the Airbnb-inspired three-layer shadow at rest.
