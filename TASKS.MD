# Tasks

Roadmap for Costa del Sol Travel Dashboard.

## Phase 11: Boat Tours, Markets & Multi-page Routing (2026-06-10)
- [x] `[FRONTEND]` Create `BoatTours.tsx` loading data from `boat-tours.json` with filters and search
- [x] `[FRONTEND]` Create `Markets.tsx` loading data from `markets.json` with city/day filters and tips accordion
- [x] `[FRONTEND]` Spin off 7-day program from main page to separate `/itinerary` subpage
- [x] `[FRONTEND]` Integrate dynamic cross-page linking between home page `/` and `/itinerary` via query parameters and route push
- [x] `[FRONTEND]` Add Suspense boundaries to `/` layout to support static build pre-rendering with search parameters
- [x] `[DEVOPS]` Compile and verify static export build successfully using `npm run build`

## Phase 10: Client-side Password Protection & Static Export Restore (2026-06-09)
- [x] `[DEVOPS]` Restore static export configuration (`output: 'export'`) in `next.config.js` for GitHub Pages hosting compatibility
- [x] `[FRONTEND]` Implement client-side `PasswordWall.tsx` matching the visual design, storing hash checks in `localStorage`
- [x] `[FRONTEND]` Wrap the main application entry in `app/page.tsx` with the `PasswordWall` component
- [x] `[DEVOPS]` Delete server-side `middleware.ts` and the dynamic backend `/login` route
- [x] `[DEVOPS]` Restore `.github/workflows/pages-deploy.yml` to compile and deploy to GitHub Pages
- [x] `[DEVOPS]` Verify static build compilation locally and push changes to trigger deployment action

## Phase 9: Password Protection, Expense Tracker & Dynamic Routing (2026-06-09)
- [x] `[DEVOPS]` Comment out static export configurations in `next.config.js` to enable Next.js server-side dynamic routing
- [x] `[BACKEND]` Implement authorization checker in `middleware.ts` based on `sol-auth` cookie verification
- [x] `[FRONTEND]` Create secure dynamic `/login` route utilizing Next.js server actions to handle user sessions
- [x] `[FRONTEND]` Create and integrate the `Expenses.tsx` tracker component using JSON static data files
- [x] `[BACKEND]` Populate `data/expenses.json` with trip expenses details (flights, lodging, car rental)
- [x] `[DEVOPS]` Update GitHub actions workflow `.github/workflows/pages-deploy.yml` to compile and verify rather than static pages deployment
- [x] `[FRONTEND]` Style and render driving route types (AP-7 vs A-7) dynamically in `Logistics.tsx`
- [x] `[BACKEND]` Streamline descriptions and add new target locales and zones (Fuengirola, Torremolinos) in `data/movida-over35.json`
- [x] `[DEVOPS]` Verify compilation with `npm run build` and push changes to git

## Phase 8: Historical Report 2013 & Restaurant Images Integration (2026-06-09)
- [x] `[BACKEND]` Replace placeholder image URLs in `data/restaurants.json` with authentic Feverup, Tripadvisor, and official restaurant site images
- [x] `[BACKEND]` Create and populate `"historicalReport"` key in `data/movida-over35.json` with analysis and status tracking from the 2013 GnoccaTravel Malaga forum thread
- [x] `[FRONTEND]` Add `"historical"` tab ("Report Storico 2013") to `SingleGuide.tsx` rendering the historical report data, status updates of past venues, and original link
- [x] `[FRONTEND]` Support rendering of venue image previews (`imageUrl`) and official websites (`website`) in the main venues listing in `SingleGuide.tsx`
- [x] `[DEVOPS]` Verify compilation with `npm run build` and push the updates to git

## Phase 7: Lodging Guide & Detailed Action Plan for Single Over 35 (2026-06-03)
- [x] `[BACKEND]` Create and populate `"alloggio"` key in `data/movida-over35.json` with detailed strategies for 4 key areas
- [x] `[FRONTEND]` Add `"alloggio"` tab ("Dove Alloggiare") to `SingleGuide.tsx` and render its contents beautifully in a responsive grid
- [x] `[BACKEND]` Expand `"plan"` key in `data/movida-over35.json` to feature a detailed day-by-day action plan for June 19-25
- [x] `[DOCUMENTATION]` Update Section 5 and append Section 10 to `C:\Users\mdeangelis\Downloads\guida_malaga_single_giugno_2026.md`
- [x] `[DEVOPS]` Verify static Next.js export compilation with `npm run build`
- [x] `[DOCUMENTATION]` Update local memory logs `GEMINI.MD`

## Phase 6: Mobile Optimization & JSON Cleanup (2026-06-03)
- [x] `[BACKEND]` Clean duplicate keys and obsolete sections from `movida-over35.json` via automated Python script
- [x] `[FRONTEND]` Add left/right fade masks to horizontal scroll tabs in `SingleGuide.tsx`
- [x] `[FRONTEND]` Optimize tab buttons text size and padding to fit better on small mobile screens
- [x] `[FRONTEND]` Convert vertical cards under "Mappa Costa" and "Dating & Social App" tabs to horizontal swipeable carousels on mobile
- [x] `[FRONTEND]` Protect address and handle elements from text overflows with truncate styles, and add color accents to MapPin/Instagram icons
- [x] `[FRONTEND]` Integrate dynamic multi-city filtering (Málaga, San Pedro, Marbella, Estepona, Nerja, Benalmádena) inside the "Mappa Locali" tab
- [x] `[DEVOPS]` Verify static Next.js export compilation with `npm run build`

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
- [x] `[FRONTEND]` Render Reddit & GnoccaTravel forum comments for outer Costa zones inside `SingleGuide.tsx`
- [x] `[DOCUMENTATION]` Integrate the pragmatic travel companion preface inside both the markdown guide and the webapp dashboard JSON/UI
- [x] `[DOCUMENTATION]` Add 10 comments, average prices, and Google Play Store links to downloaded guide `guida_malaga_single_giugno_2026.md`
- [x] `[DOCUMENTATION]` Append the multi-zone Costa guide as Section 8 in the downloaded guide `guida_malaga_single_giugno_2026.md`
- [x] `[DOCUMENTATION]` Add Reddit & GnoccaTravel comments for all Costa hotspots inside the downloaded guide `guida_malaga_single_giugno_2026.md`
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
