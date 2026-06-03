# Implementation Plan — Premium travel webapp inspiration deck and matcher

We will redesign the dashboard layout to focus on mobile-first, high-engagement, and rapid idea generation. The centerpiece will be a **Quick Inspiration Hub** (`QuickInspiration.tsx`) containing two interactive widgets:

1. **Inspiration Deck (Schede Ispirazione)**: A beautiful, swipeable/interactive card deck showing a curated or randomized card from Beaches, Restaurants, Experiences, or Attractions. Each card is loaded with visual details, drive times, tips, and an inline heart button to quickly add the item to "Il Mio Piano".
2. **Perfect Day Matcher (Generatore Giornata Perfetta)**: A magical "slot-machine" style generator that rolls a themed daily schedule (Morning Beach/Attraction -> Lunch at Chiringuito -> Afternoon/Evening Local Experience). The generator calculates drive times from the currently selected base and includes a button to "Salva Intera Giornata" (add all 3 items to "Il Mio Piano" in one click).

---

## Proposed Changes

### [FRONTEND] Costa del Sol Travel Dashboard

#### [NEW] [QuickInspiration.tsx](file:///d:/nodejs/spagna/app/components/QuickInspiration.tsx)
Create a new file containing the `QuickInspiration` component:
- State management for current random card, active inspiration category (Spiagge, Ristoranti, Esperienze, Attrazioni), and generated "Perfect Day" packages.
- A "Shuffle" button to randomize the card or the day.
- Direct synchronization with the local storage planner using the `sol-local-planner-update` custom event.
- Visual elements with Framer Motion (card flips, slides, and stagger transitions).

#### [MODIFY] [page.tsx](file:///d:/nodejs/spagna/app/page.tsx)
- Import `QuickInspiration` and add the `<QuickInspiration />` section right between `Overview` and `Videos`.
- Add `"inspiration"` to the scroll-spy section array.

#### [MODIFY] [SectionNav.tsx](file:///d:/nodejs/spagna/app/components/SectionNav.tsx)
- Add the `inspiration` item to the sections list using the `Sparkles` icon from `lucide-react`.

---

## Verification Plan

### Automated Tests
- Run `npm run build` to verify the static export builds successfully without compiler or TypeScript errors.

### Manual Verification
- Open the webapp in dev mode:
  1. Verify the "Ispirazione" section appears at the top and works with SectionNav scroll-spy.
  2. Test the **Inspiration Deck**: filter by category, tap the "Genera Idea" button, and verify different items appear.
  3. Test the **Bookmark** functionality: click the heart button on an inspiration card and verify it immediately updates the floating "Il Mio Piano" count and bookmark list.
  4. Test the **Perfect Day Matcher**: click "Genera Giornata Perfetta", inspect the Morning -> Lunch -> Afternoon timeline, and click "Aggiungi Intera Giornata al Piano". Open "Il Mio Piano" to verify all three items were correctly added.

---

## Layout Bug Fix: Filter Clipping (2026-06-03)

### Problem
- Filter options under "Filtra per zona" and "Filtra per atmosfera" on desktop were clipped/truncated on the right edge with no visible scrollbar to scroll, making them inaccessible.

### Proposed Changes
- Modify the flex containers in the filter areas to support responsive styles:
  - On mobile: horizontal scrolling carousel (`overflow-x-auto whitespace-nowrap snap-x`).
  - On desktop (`sm:` screens and above): wrap items to the next line (`sm:flex-wrap sm:overflow-visible sm:whitespace-normal sm:snap-none`).
- Affected components:
  1. [Beaches.tsx](file:///d:/nodejs/spagna/app/components/Beaches.tsx) (Zones, Atmospheres)
  2. [Food.tsx](file:///d:/nodejs/spagna/app/components/Food.tsx) (Zones)
  3. [Nightlife.tsx](file:///d:/nodejs/spagna/app/components/Nightlife.tsx) (Zones)
  4. [Videos.tsx](file:///d:/nodejs/spagna/app/components/Videos.tsx) (Zones, Types)
  5. [Budget.tsx](file:///d:/nodejs/spagna/app/components/Budget.tsx) (Budget levels)
  6. [QuickInspiration.tsx](file:///d:/nodejs/spagna/app/components/QuickInspiration.tsx) (Quick categories)

### Verification Plan
- Run `npm run build` to verify there are no compilation errors.
- Inspect the filter layouts on desktop (elements wrap neatly instead of getting truncated) and mobile (horizontal carousel scrolling remains active).

---

## Mappa Costa Comments & Mobile Menu Refinements (2026-06-03)

### Problem
- The "Mappa Costa" tab in the UI (`SingleGuide.tsx`) did not render the Reddit and GnoccaTravel forum comments for the external Costa del Sol zones, despite the comments being present in `movida-over35.json`.
- The offline guide `guida_malaga_single_giugno_2026.md` was also missing these comments under Section 8.
- The mobile hamburger menu suffered from a laggy scroll-into-view transition and gesture bubble conflicts that made navigation feel glitchy.

### Proposed Changes
- **Frontend Comments Rendering**: Modified the `costa` tab in `SingleGuide.tsx` to loop through `venue.comments` and render each comment in an italicized, compact container using the `MessageSquare` icon.
- **Offline Guide Synchronization**: Updated Section 8 in `guida_malaga_single_giugno_2026.md` to append the Reddit & GnoccaTravel comments list for all Costa hotspots.
- **Hamburger Menu Polishing**:
  - Restored outer overlay backdrop clicks in `SectionNav.tsx` while calling `e.stopPropagation()` on the inner links and footer containers to prevent accidental menu closure on dragging or tapping footer stats.
  - Reduced scroll-spy and menu exit transition timeouts to 50ms in both `SectionNav.tsx` and `page.tsx` for instant section jumping.

### Verification Plan
- Run `npm run build` to confirm a 100% clean Next.js static build.
- Manually check the "Mappa Costa" tab in the UI to verify comments show up correctly under all 11+ hotspots.
- Verify the offline guide markdown formatting is clean and without duplicates.

---

## Mobile Layout Optimization & JSON Key Cleanup (2026-06-03)

### Problem
- The "Movida Over 35" section was vertically very long on mobile, stacking multiple large components, zone lists, and app cards, leading to scroll fatigue.
- Horizontal tab buttons on small screens had large text and padding, causing them to push cards too far down.
- Obsolete duplicate sections in `movida-over35.json` caused file bloat and potential parsing mismatches.
- Text overflow could occur on long physical addresses or Instagram handles on small viewports.

### Proposed Changes
- **Horizontal Swipeable Layouts (Carousels)**: Changed vertical stacks in "Mappa Costa" and both sections of "Dating & Social App" to horizontal swipeable lists on mobile while preserving the grid display on desktop.
- **Tab Padding & Fade Masks**: Reduced the horizontal tab buttons padding and text size on mobile screens, and wrapped the container in side fade gradients for visual scrolling hints.
- **JSON Cleanup**: Ran an automated Python script to strip the duplicate keys and legacy sections from `data/movida-over35.json`.
- **Text Safety & Accents**: Added truncate styles to physical addresses and Instagram handles, and added color accents (pink for Instagram, terracotta/red for MapPin) to enrich user interface visuals.

### Verification Plan
- Run `npm run build` to compile the static application and verify zero compilation/linting/TypeScript errors.
- Inspect the dashboard UI on mobile viewports: verify horizontal swiping behaves smoothly, fade masks blend seamlessly, and addresses/handles wrap gracefully.

---

## Multi-City Filter in Mappa Locali (2026-06-03)

### Problem
- The "Mappa Strategica dei Locali (Residenti vs Adult Entertainment)" tab (`activeTab === 'locali'`) was limited to displaying only Málaga Centro venues, neglecting hot spots for San Pedro de Alcántara, Marbella, Estepona, Nerja, and Benalmádena.

### Proposed Changes
- **Data Enrichment**: Added category labels (TARDEO, TAPAS, PUB, CLUB, LATINO, ADULT) and categoryColors directly into the Costa zones' venues within `data/movida-over35.json`.
- **City Selector Tabs**: Added a horizontal city filter bar (Málaga Centro, San Pedro, Marbella, Estepona, Nerja, Benalmádena) at the top of the "Mappa Locali" tab in `SingleGuide.tsx`.
- **Dynamic Normalizer Hook**: Added an `activeLocali` computed array. It reads the selected city state, dynamically retrieves corresponding venues from `movidaData.costa.zones` or `movidaData.locali`, maps the details into standard descriptions, and unified styling rendering for adult locales (identifying them by `"ADULT"` category instead of hardcoded `"divas"` ID).

### Verification Plan
- Run `npm run build` to confirm compilation.
- Verify selection: click on San Pedro, Marbella, Estepona, Nerja, or Benalmádena tabs inside "Mappa Locali" and verify they show their respective venues with correct titles, badges, and comments.
