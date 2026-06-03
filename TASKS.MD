# Tasks

Roadmap for Costa del Sol Travel Dashboard.

## Phase 5: Forum Comments, Adult Club Prices & Dating App links
- [x] `[BACKEND]` Populate `data/movida-over35.json` with exactly 10 comments for each Malaga and Nerja venue
- [x] `[BACKEND]` Include average prices for adult clubs (Sala Divas and Puticlubs) in description and safety guidelines
- [x] `[BACKEND]` Add Google Play Store package links for Meetic, Badoo, Adopta, Tinder, Bumble, and Happn in JSON data
- [x] `[BACKEND]` Append the new Costa del Sol multi-zone guide (San Pedro, Marbella, Estepona, Nerja, Benalmádena) to `data/movida-over35.json`
- [x] `[BACKEND]` Integrate alternative beaches and strategic positioning for Noche de San Juan outside Málaga in `data/san-juan.json` and `data/movida-over35.json`
- [x] `[DOCUMENTATION]` Append Section 9 (Speciale Noche de San Juan Fuori Málaga) to the downloaded travel guide `guida_malaga_single_giugno_2026.md`
- [x] `[FRONTEND]` Update `SingleGuide.tsx` to support newlines in descriptions and render Android download buttons
- [x] `[FRONTEND]` Update `SingleGuide.tsx` to dynamically render comments in a styled container
- [x] `[FRONTEND]` Reorder sections (place "Movida Over 35" / `SingleGuide.tsx` immediately after "Overview" and before "Base") in `page.tsx` and `SectionNav.tsx`
- [x] `[FRONTEND]` Fix mobile hamburger menu click event bubbling (accidental closures on drag/footer click) and speed up scroll triggers to 100ms in `SectionNav.tsx`
- [x] `[FRONTEND]` Integrate the new "Mappa Costa" tab in `SingleGuide.tsx` to render the outer Costa zones and hotspots
- [x] `[DOCUMENTATION]` Integrate the pragmatic travel companion preface inside both the markdown guide and the webapp dashboard JSON/UI
- [x] `[DOCUMENTATION]` Add 10 comments, average prices, and Google Play Store links to downloaded guide `guida_malaga_single_giugno_2026.md`
- [x] `[DOCUMENTATION]` Append the multi-zone Costa guide as Section 8 in the downloaded guide `guida_malaga_single_giugno_2026.md`
- [x] `[DEVOPS]` Validate static export build with `npm run build`


## Phase 4: Webapp Inspiration Hub & Matcher
- [x] `[FRONTEND]` Create `app/components/QuickInspiration.tsx` component
- [x] `[FRONTEND]` Integrate inspiration component into `app/page.tsx`
- [x] `[FRONTEND]` Wire inspiration section into `app/components/SectionNav.tsx`
- [x] `[FRONTEND]` Fix clipping and truncation of filter options on desktop (Beaches, Food, Nightlife, Videos, Budget, QuickInspiration)
- [x] `[FRONTEND]` Add Over-35 Local Nightlife Guide in `Nightlife.tsx`
- [x] `[FRONTEND]` Create dedicated `SingleGuide.tsx` section and wire into `page.tsx` & `SectionNav.tsx`
- [x] `[FRONTEND]` Integrate Focus Nerja (Costa del Sol Est) for single over-35 into `SingleGuide.tsx`
- [x] `[FRONTEND]` Enrich SingleGuide.tsx with Google Maps links, addresses, and Instagram profiles for Málaga and Nerja venues
- [x] `[FRONTEND]` Update Spain-specific Dating Apps mapping and rules of thumb in SingleGuide.tsx and the downloaded guide
- [x] `[DOCUMENTATION]` Enrich local downloaded guide `guida_malaga_single_giugno_2026.md` with addresses, maps links, and social links
- [x] `[BACKEND]` Extract SingleGuide content to `data/movida-over35.json` and load it dynamically in `SingleGuide.tsx`
- [x] `[DEVOPS]` Validate static export build with `npm run build`
- [x] `[DOCUMENTATION]` Update local `GEMINI.MD` and `README.md`



## Phase 3: Costa de Nerja / Maro Integration
- [x] `[BACKEND]` Append Nerja/Maro beaches to `data/beaches.json`
- [x] `[BACKEND]` Append Nerja restaurants to `data/restaurants.json`
- [x] `[BACKEND]` Append Nerja nightlife to `data/nightlife.json`
- [x] `[BACKEND]` Append Nerja typical dishes to `data/food.json`
- [x] `[BACKEND]` Append Nerja experiences to `data/local-experiences.json`
- [x] `[BACKEND]` Append Nerja attractions to `data/attractions.json`
- [x] `[BACKEND]` Append Nerja videos to `data/trip.json`
- [x] `[BACKEND]` Append Nerja to `data/bases.json`
- [x] `[DOCUMENTATION]` Update `GEMINI.MD`
- [x] `[DOCUMENTATION]` Update `README.md`
- [x] `[DEVOPS]` Verify compilation with `npm run build`

## Phase 2: Premium Mobile Design Enhancements (Completed)
- [x] `[FRONTEND]` Swipers on mobile (Videos, Beaches, Food, Experiences, San Juan, Base Selection)
- [x] `[FRONTEND]` Horizontal filters on mobile (Beaches, Videos)
- [x] `[FRONTEND]` Itinerary layout squish fix
- [x] `[FRONTEND]` Budget chart label collision fix
- [x] `[DEVOPS]` Production build verification (0 errors)

## Phase 1: Frontend Production Polish (Completed)
- [x] `[FRONTEND]` Unused imports cleanup (Budget.tsx)
- [x] `[FRONTEND]` New Videos.tsx component
- [x] `[FRONTEND]` Wire Videos into page.tsx + SectionNav.tsx
- [x] `[FRONTEND]` Text contrast hardening (Nightlife.tsx, Food.tsx)
- [x] `[FRONTEND]` Card-shadow consistency (BaseSelection, SanJuan, LocalExperiences, Logistics)
- [x] `[FRONTEND]` Production build verification (0 errors)
- [x] `[DEVOPS]` Webpack cache stale troubleshooting (Delete .next directory)
- [x] `[DOCUMENTATION]` AGENTS.md update
- [x] `[DOCUMENTATION]` GEMINI.MD creation
