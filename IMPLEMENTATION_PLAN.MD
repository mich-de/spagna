# Plan — Boat Tours, Markets and Separate Itinerary Routing

We will implement the following checklist to fulfill the request:

## 1. Create `BoatTours` Component
- Create [BoatTours.tsx](file:///d:/nodejs/spagna/app/components/BoatTours.tsx) loaded from `data/boat-tours.json`.
- Implement filters (by type: catamaran, boat, sailboat, rental) and a text search bar.
- Style cards using the "Sol & Local" design system (`card-shadow`, `card-hover`, glassmorphism, HSL custom colors).
- Display departure points with map links, duration, capacity, pricing, booking info, and comments (forum reviews).

## 2. Create `Markets` Component
- Create [Markets.tsx](file:///d:/nodejs/spagna/app/components/Markets.tsx) loaded from `data/markets.json`.
- Display the intro text in a header banner.
- Implement search filtering by market name, city, products, and day of the week.
- Style cards to highlight city, days, location, parking, size (stalls count), products as pills, tips, and comments.

## 3. Move Itinerary to Separate Page
- Create [app/itinerary/page.tsx](file:///d:/nodejs/spagna/app/itinerary/page.tsx) rendering the [Itinerary.tsx](file:///d:/nodejs/spagna/app/components/Itinerary.tsx) component.
- Keep the `Itinerary.tsx` component in `app/components/Itinerary.tsx` for cleaner structure but load it from the new route.
- In the new route `/itinerary`, wrap `Itinerary` in a page layout with its own `SectionNav` where `activeSection="itinerary"`.
- Remove the itinerary section rendering from the main page [page.tsx](file:///d:/nodejs/spagna/app/page.tsx).

## 4. Multi-page Cross-Linking and Navigation
- Update [SectionNav.tsx](file:///d:/nodejs/spagna/app/components/SectionNav.tsx):
  - Detect current page using `usePathname()`.
  - When clicking navigation links:
    - If on home page `/`, clicking links (except Itinerario) will scroll to the local anchors. Clicking `Itinerario` will redirect to `/itinerary`.
    - If on `/itinerary`, clicking `Itinerario` will scroll to top. Clicking any other link will redirect to `/?scroll=sectionId`.
- Update [page.tsx](file:///d:/nodejs/spagna/app/page.tsx):
  - Add search params detection (using `useSearchParams`).
  - If a `scroll` query parameter is present (e.g. `?scroll=beaches`), scroll to the corresponding section smoothly after mount.
  - Remove `'itinerary'` from the main `sections` array and add `'boat-tours'` and `'markets'`.
- Wire `BoatTours` and `Markets` into [page.tsx](file:///d:/nodejs/spagna/app/page.tsx) and [SectionNav.tsx](file:///d:/nodejs/spagna/app/components/SectionNav.tsx).

## 5. Verify Build
- Run local production build `npm run build` to verify code correctness and static HTML export compatibility.
