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
- Resolved Webpack runtime compiler crashes by clearing `.next` cache, adding a `predev` cleanup hook to `package.json`, and explicitly adding the cleanup step to `start.bat` and `start.ps1`.
- Silenced React hydration mismatch errors caused by browser extensions (e.g., Brave) injecting custom attributes like `bis_skin_checked="1"` by adding a global DOM observer script in `app/layout.tsx` to scrub attributes before hydration, in addition to `suppressHydrationWarning` on root tags.

### 2026-05-27 — Costa de Nerja & Maro Integration
- Integrated Eastern Costa del Sol region (**Costa de Nerja / Maro**) into all dashboard components dynamically through data files.
- Added 3 beaches (Burriana, Maro, Calahonda) under `"zone": "Nerja"`.
- Added 3 restaurants (Chiringuito Ayo, El Pulguilla, Restaurante Oliva).
- Added Plaza Tutti Frutti to nightlife, including Cochran's Irish Pub and Agora Bar.
- Added typical dishes (Paella de Burriana, Boquerones fritos, Canaíllas) and local experiences (Maro Cliffs kayak tour, Balcón de Europa sunset walk).
- Added natural/historical attractions (Cueva de Nerja, Balcón de Europa) and an inspirational YouTube travel guide.
### 2026-05-27 — Risoluzione Runtime Error (Vendor Chunks)
- Risolto errore `Cannot find module './vendor-chunks/next.js'` causato da cache corrotta in Next.js 15 su Windows.
- Aggiunto script `npm run clean` in `package.json` che rimuove `.next`, `out` e `node_modules/.cache`.
- Aggiornati `start.bat` e `start.ps1` per eseguire una pulizia profonda automatica prima dell'avvio.
- Creata pagina `app/not-found.tsx` personalizzata per evitare crash del componente di default di Next.js.
- Semplificato `next.config.js` rimuovendo `outputFileTracingRoot`.
- Fissata versione Next.js a `15.5.18` per coerenza con l'ambiente dell'utente.

### 2026-06-03 — Git Pull, Validation & Inspiration Hub
- Scaricati gli aggiornamenti da Git (5 commit fast-forwarded).
- Eseguito `npm ci` per allineare le dipendenze locali.
- Creato il nuovo componente interattivo `QuickInspiration.tsx` (Inspiration Deck + Perfect Day Matcher) per consentire all'utente di ottenere spunti rapidi e salvare intere giornate organizzate per zone direttamente in "Il Mio Piano".
- Integrato il componente in `page.tsx` come sezione indipendente e registrato in `SectionNav.tsx` sotto l'icona `Sparkles`.
- Eseguito con successo `npm run build` per verificare che la build statica di Next.js compili correttamente senza errori di compilazione o type-checking.

### 2026-06-03 — Risoluzione Taglio Voci nei Filtri (Desktop Wrapping)
- Risolto il problema del taglio delle voci nei filtri su desktop in `Beaches.tsx`, `Food.tsx`, `Nightlife.tsx`, `Videos.tsx`, `Budget.tsx` e `QuickInspiration.tsx`.
- Modificati i contenitori flex dei filtri per permettere il wrapping degli elementi (`sm:flex-wrap`) e rendere visibile l'overflow (`sm:overflow-visible` e `sm:whitespace-normal`) su schermi desktop, mantenendo la visualizzazione a carosello orizzontale a scorrimento solo su schermi mobili.

### 2026-06-03 — Guida Movida Over 35 (Locali & Socializzazione)
- Aggiunta una sezione dedicata in `Nightlife.tsx` con una guida premium sulla movida autentica per un pubblico over 35, focalizzata sulla socializzazione con persone locali anziché turisti.
- Inclusi dettagli specifici per il centro di Málaga (La Tranca, Barsovia), la costa Est (Pedregalejo e Baños del Carmen per il tardeo) e la zona moderna locale (Teatinos), incrociando feedback e report aggiornati per il 2026.

### 2026-06-03 — Sezione Dedicata Movida Over 35 & Single Guide
- Creata una sezione indipendente e dedicata `SingleGuide.tsx` ("Movida Over 35") inserita dopo Nightlife nel layout di `page.tsx` e registrata in `SectionNav.tsx` con l'icona `Users`.
- Integrato il report completo `guida_malaga_single_giugno_2026.md` con 6 tab interattive: Briefing & Mindset, Mappa Locali (inclusi Discoteca Liceo, Rocknrolla, Sala Divas, Clubs de Alterne), Tardeo al Perreo, Dating & Social App, Piano d'Azione Day-by-Day (19-25 Giugno 2026) e Sicurezza & Logistica.
- Risolto avviso Next.js sui molteplici lockfile e ripristinato `outputFileTracingRoot` in `next.config.js` usando `path.resolve(__dirname)` per evitare errori di PageNotFoundError durante l'export statico.

### 2026-06-03 — Focus Nerja (Costa del Sol Est) in Single Guide
- Integrato il focus logistico e strategico per single over 35 su Nerja in `SingleGuide.tsx` aggiungendo un tab dedicato ("Focus Nerja") con zone (Centro, Plaza Tutti Frutti, Burriana), locali target (El Molino, Tamareo Latino, Seven/Rockefeller), dinamica per la Noche de San Juan a Playa de Burriana, e strategia micro-localizzata di dating app allargando il raggio a Torre del Mar e Vélez-Málaga.
- Aggiornata la guida cartacea locale `guida_malaga_single_giugno_2026.md` aggiungendo la sezione appendice 7 al fondo.

### 2026-06-03 — Integrazione Mappe, Instagram e Dating App (Polishing Single Guide)
- Aggiunti gli indirizzi fisici, link diretti a Google Maps e profili Instagram ufficiali (o tag di ricerca rilevanti) per tutti i locali menzionati nella guida strategica "Movida Over 35" sia nel componente interattivo `SingleGuide.tsx` che nel file scaricato `guida_malaga_single_giugno_2026.md`.
- Integrata la nuova mappatura approfondita per le Dating App in Spagna (Meetic.es, Badoo, Adopta, Tinder/Bumble con filtro bio e geofencing, Happn) e le relative "Regole d'Oro" per il profilo, sincronizzando i contenuti del tab "Dating & Social App" e della sezione 3 del file di testo.
- Verificata la corretta compilazione statica del progetto Next.js tramite `npm run build` con esito positivo e zero errori.

### 2026-06-03 — Estrazione Dati Single Guide in JSON
- Creato il file di dati `data/movida-over35.json` in cui è stato estratto tutto il contenuto informativo della guida strategica per single over 35 (briefing, locali di Málaga e Nerja, tardeo, dating app, itinerario settimanale e sicurezza).
- Rifattorizzato il componente `SingleGuide.tsx` in modo che carichi i dati dinamicamente dal JSON, semplificando il codice JSX e rispettando le convenzioni dell'architettura del progetto.
- Eseguito con successo `npm run build` per validare l'assenza di errori nella compilazione statica di Next.js.

### 2026-06-03 — Integrazione 10 Voci Forum, Prezzi Locali Adulti & Link Dating App
- Popolato `data/movida-over35.json` con esattamente 10 commenti per ciascun locale di Málaga e Nerja.
- Aggiornata la guida scaricabile `guida_malaga_single_giugno_2026.md` inserendo le 10 recensioni/commenti per Sala Divas, Bar Típico El Molino, Pub Tamareo, Seven e Rockefeller Premium.
- Inserite le tariffe medie di riferimento per i locali per adulti (Sala Divas e Clubs de Alterne) sia nella descrizione del JSON che nella guida markdown.
- Aggiunti i link diretti al Google Play Store per tutte le Dating App (Meetic, Badoo, Adopta, Tinder, Bumble, Happn) sia nel JSON che nella guida markdown.
- Rifattorizzato `SingleGuide.tsx` per abilitare `whitespace-pre-line` per le descrizioni a capo e visualizzare dinamicamente i pulsanti di download Android per le app.
- Riposizionata la sezione "Movida Over 35" (`SingleGuide.tsx` / `single-guide`) subito dopo "Overview" e prima di "Scelta della Base" (`BaseSelection.tsx` / `base`) sia in `page.tsx` che in `SectionNav.tsx` per assecondare la richiesta dell'utente.
- Risolto il problema del menu hamburger mobile in `SectionNav.tsx` rimuovendo l'handler `onClick` sul contenitore principale per evitare che tap, trascinamenti per lo scrolling o click sul footer chiudessero accidentalmente il menu, e ottimizzato il tempo di risposta dello scroll a 100ms.
- Integrata la nota introduttiva pragmatica (franchezza ed empatia del compagno di viaggio digitale sulle mete ad alto rendimento) sia come banner nel tab "Briefing & Mindset" di `SingleGuide.tsx` (tramite `data/movida-over35.json`) sia all'inizio della sezione 2 di `guida_malaga_single_giugno_2026.md`.
- Integrata la mappatura strategica Costa del Sol (San Pedro, Marbella, Estepona, Nerja, Benalmádena) con gli hotspots di socializzazione, pro/contro e dettagli sul target local e latina residente sia nel JSON (`data/movida-over35.json`) che come nuovo tab "Mappa Costa" in `SingleGuide.tsx` e Appendice 8 nel file markdown.
- Eseguito con successo `npm run build` per validare la correttezza della build statica.

### 2026-06-03 — Noche de San Juan Playas & Strategies
- Integrate 4 spiagge della Costa del Sol oltre a quelle di Málaga per i festeggiamenti di San Juan (La Carihuela a Torremolinos, Santa Ana a Benalmádena, El Cable a Marbella, La Rada a Estepona) in `data/san-juan.json`.
- Aggiornata la pianificazione giornaliera in `data/movida-over35.json` per fare riferimento a queste località target over 35 e con presenza local/latina.
- Aggiunta la sezione 9 ("Speciale Noche de San Juan Fuori Málaga") nel report `guida_malaga_single_giugno_2026.md` con l'analisi delle spiagge e le "Regole d'Oro" per il posizionamento strategico e l'approccio sulla sabbia.
- Eseguito con successo `npm run build` ed effettuato il commit e push su git.

### 2026-06-03 — Integrazione Commenti Forum Mappa Costa & Risoluzione Menu Mobile
- Integrati i commenti reali dei forum Reddit e GnoccaTravel per tutti gli hotspot della sezione "Mappa Costa" sia nel file JSON (`data/movida-over35.json`), sia nel componente `SingleGuide.tsx` sia all'interno della sezione 8 della guida offline `guida_malaga_single_giugno_2026.md`.
- Risolti i problemi di glitch del menu mobile in `SectionNav.tsx` prevenendo la propagazione dei click sul menu interno ed accelerando il timeout del cambio sezione a 50ms per rendere gli switch istantanei e fluidi su smartphone.
- Eseguito con successo `npm run build` verificando l'assenza di errori e la corretta esportazione statica Next.js.

## Known Gotchas

1. **Tailwind v4 `@config`**: Must be present. See above.
2. **Fontsource v5**: Import `400-italic.css`, not `italic.css`
3. **Bundle note**: Page is ~177 kB (279 kB first load). YouTube thumbnails are external images, not bundled.
4. **Port**: Dev server may use 3001 if 3000 is occupied.
5. **Hydration Mismatches (Browser Extensions)**: Extensions (like Brave or adblockers) can inject attributes such as `bis_skin_checked` during load. A global inline script in `RootLayout` observes and removes them before React hydrates, resolving console hydration overlays. Keep `suppressHydrationWarning` active on root wrapper nodes (`html`, `body`, etc.) as a fallback.
6. **Next.js static export race condition on Windows**: When running `npm run build` immediately after a clean sweep, Next.js page generation might occasionally fail with a `PageNotFoundError` or `webpack-runtime.js` type error due to Windows disk write latency. Simply running `npm run build` a second time resolves it.
