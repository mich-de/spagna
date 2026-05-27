# Implementation Plan — Premium Mobile Design Enhancements

This plan outlines design enhancements to optimize the **mobile layout (viewports < 640px)** of the Costa del Sol Travel Dashboard. The changes will implement premium mobile patterns (horizontal snap carousels, responsive tables, scrollable filters, and responsive charts) to create a native-app-like user experience.

## Proposed Changes

### 1. Unified Card Swipers on Mobile
Instead of tall vertical stacks of cards that increase page height and scrolling fatigue, cards will render as **horizontally scrollable carousels on mobile** with snap alignment (`snap-x snap-mandatory`) and display as standard grids on desktop. By using `min-w-[85vw]`, the edge of the next card is partially visible, signaling scrollability.

#### [MODIFY] [Videos.tsx](file:///d:/nodejs/spagna/app/components/Videos.tsx)
- Change video grid container to `flex sm:grid sm:grid-cols-2 lg:grid-cols-3 overflow-x-auto sm:overflow-visible gap-4 pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0`
- Set card width to `min-w-[85vw] xs:min-w-[300px] sm:min-w-0 snap-center`

#### [MODIFY] [Beaches.tsx](file:///d:/nodejs/spagna/app/components/Beaches.tsx)
- Change beaches grid container to `flex sm:grid sm:grid-cols-2 lg:grid-cols-3 overflow-x-auto sm:overflow-visible gap-4 pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0`
- Set card width to `min-w-[85vw] xs:min-w-[300px] sm:min-w-0 snap-center`

#### [MODIFY] [Food.tsx](file:///d:/nodejs/spagna/app/components/Food.tsx)
- Change dishes grid container to `flex sm:grid sm:grid-cols-2 lg:grid-cols-3 overflow-x-auto sm:overflow-visible gap-3 pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0`
- Set dish card width to `min-w-[85vw] xs:min-w-[300px] sm:min-w-0 snap-center`
- Change restaurants grid container to `flex sm:grid sm:grid-cols-2 lg:grid-cols-3 overflow-x-auto sm:overflow-visible gap-4 pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0`
- Set restaurant card width to `min-w-[85vw] xs:min-w-[300px] sm:min-w-0 snap-center` and add the missing `card-shadow` class.

#### [MODIFY] [LocalExperiences.tsx](file:///d:/nodejs/spagna/app/components/LocalExperiences.tsx)
- Change experiences grid container to `flex sm:grid sm:grid-cols-2 lg:grid-cols-3 overflow-x-auto sm:overflow-visible gap-3 pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0`
- Set card width to `min-w-[85vw] xs:min-w-[300px] sm:min-w-0 snap-center`

#### [MODIFY] [SanJuan.tsx](file:///d:/nodejs/spagna/app/components/SanJuan.tsx)
- Change spots grid container to `flex sm:grid sm:grid-cols-2 lg:grid-cols-4 overflow-x-auto sm:overflow-visible gap-3 pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 mb-6`
- Set card width to `min-w-[85vw] xs:min-w-[300px] sm:min-w-0 snap-center`

#### [MODIFY] [BaseSelection.tsx](file:///d:/nodejs/spagna/app/components/BaseSelection.tsx)
- Change bases grid container to `flex md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-visible gap-4 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 mt-8`
- Set card width to `min-w-[85vw] xs:min-w-[300px] md:min-w-0 snap-center`

---

### 2. Horizontal Scrolling Filters
To prevent vertical stack clutter on mobile screens, category buttons in search and filter bars will be displayed in a single, horizontally scrollable row.

#### [MODIFY] [Beaches.tsx](file:///d:/nodejs/spagna/app/components/Beaches.tsx)
- Wrap filter button groups in `flex overflow-x-auto scrollbar-hide gap-1.5 items-center pb-1 -mx-2 px-2 sm:mx-0 sm:px-0 whitespace-nowrap`

#### [MODIFY] [Videos.tsx](file:///d:/nodejs/spagna/app/components/Videos.tsx)
- Wrap filter button groups in `flex overflow-x-auto scrollbar-hide gap-1.5 items-center pb-1 -mx-2 px-2 sm:mx-0 sm:px-0 whitespace-nowrap`

---

### 3. Itinerary Layout Squish Fix
Prevent long titles from wrapping awkwardly by moving the energy/budget badges under the title on mobile viewports.

#### [MODIFY] [Itinerary.tsx](file:///d:/nodejs/spagna/app/components/Itinerary.tsx)
- Adjust the layout of the day card header:
  - On mobile (`flex-col sm:flex-row`), move the metadata badges (`energy` and `budget`) into a row directly below the title.
  - On larger screens (`sm` and up), keep the side-by-side layout with badges on the right.
  - Retain the `ChevronDown` arrow on the right at all times for clean interactivity.

---

### 4. Chart Label Collision Fix
Eliminate messy text collisions on the budget chart when viewed on mobile screens.

#### [MODIFY] [Budget.tsx](file:///d:/nodejs/spagna/app/components/Budget.tsx)
- Introduce a window listener to track `isMobile` status.
- When `isMobile` is true, hide the X-Axis labels (`tick={false}`) on the Recharts `BarChart`. Users can click individual bars to view tooltips, and refer to the itemized breakdown list located directly below the chart.

---

## Verification Plan

### Automated Verification
```bash
npm run build   # Must compile and bundle successfully with 0 errors/warnings
```

### Manual Verification
- Verify that sections slide smoothly on mobile viewports, snap-center correctly, and retain grid columns on desktop.
- Verify horizontal filter lists scroll cleanly.
- Verify day titles in the itinerary accordion have ample width and badges render beautifully beneath them.
- Check budget chart on mobile screens to ensure X-axis labels are cleanly hidden and tooltips trigger on bar click.
