# Frontend Production Polish — Costa del Sol Dashboard

Build passes with 0 errors and 0 warnings. The following plan focuses on **production-grade visual quality, consistency, and robustness** across all 11 components.

## Audit Summary

After reviewing every component, CSS file, data file, and the Tailwind config, I identified the following categories of improvements:

---

## Proposed Changes

### 1. Unused imports cleanup (0-risk)

#### [MODIFY] [Budget.tsx](file:///d:/nodejs/spagna/app/components/Budget.tsx)
- Remove unused `PieChart`, `Pie`, `Sector` imports from `recharts` — dead code, increases bundle.
- Remove unused `DollarSign` import from `lucide-react`.

---

### 2. Video section — `trip.json` has 13 videos, but no component renders them

The `trip.json` now contains a rich `videos[]` array (13 YouTube videos categorized by zone and type: guide, walking, nightlife, vlog, beach). This data is currently **unused**.

#### [NEW] [Videos.tsx](file:///d:/nodejs/spagna/app/components/Videos.tsx)
- New section component displaying embedded YouTube thumbnails in a filterable grid
- Filter by zone (Benalmádena, Marbella, Estepona) using pill buttons like Beaches
- Each card shows: thumbnail (YouTube `img.youtube.com/vi/{id}/mqdefault.jpg`), title, zone badge, duration, type badge
- Clicking opens the YouTube link in a new tab (no iframe embed = no privacy/performance penalty)
- Matches existing design language: `glass` cards, `card-shadow`, `card-hover`, `badge-pill`

#### [MODIFY] [page.tsx](file:///d:/nodejs/spagna/app/page.tsx)
- Import and render `<Videos />` between `<Overview />` and `<BaseSelection />`
- Add `'videos'` to the `sections` scroll-spy array

#### [MODIFY] [SectionNav.tsx](file:///d:/nodejs/spagna/app/components/SectionNav.tsx)
- Add `{ id: 'videos', label: 'Video', icon: Play }` to the nav sections array

---

### 3. Text contrast & consistency hardening

#### [MODIFY] [Nightlife.tsx](file:///d:/nodejs/spagna/app/components/Nightlife.tsx)
- `<p>` inside `bg-white/50` strategy panel has **no text color class** — relies on parent's `text-mare-700/80` which works but is inherited via `text-sm text-mare-700/80` on the parent `div`. Add explicit `text-mare-700/80` to be safe.

#### [MODIFY] [Food.tsx](file:///d:/nodejs/spagna/app/components/Food.tsx)
- Add `card-shadow` to food dish cards for consistency with restaurant cards below

---

### 4. Section visual consistency

Several sections are missing `card-shadow` on their cards, creating inconsistency:

#### [MODIFY] [BaseSelection.tsx](file:///d:/nodejs/spagna/app/components/BaseSelection.tsx)
- Add `card-shadow` to the base comparison cards

#### [MODIFY] [SanJuan.tsx](file:///d:/nodejs/spagna/app/components/SanJuan.tsx)
- Add `card-shadow` to spot cards

#### [MODIFY] [LocalExperiences.tsx](file:///d:/nodejs/spagna/app/components/LocalExperiences.tsx)
- Add `card-shadow` to experience cards

#### [MODIFY] [Logistics.tsx](file:///d:/nodejs/spagna/app/components/Logistics.tsx)
- Add `card-shadow` to all logistics panels

---

### 5. AGENTS.md & GEMINI.MD documentation

#### [MODIFY] [AGENTS.md](file:///d:/nodejs/spagna/AGENTS.md)
- Update Tech stack to document `@config "../tailwind.config.mts"` requirement
- Add `@config` MANDATORY build gotcha
- Add text contrast convention
- Add Videos.tsx to the structure tree
- Add `videos` entry to data table

#### [NEW] [GEMINI.MD](file:///d:/nodejs/spagna/GEMINI.MD)
- Persistent memory log documenting architectural decisions, session history, and known gotchas

---

## Verification Plan

### Automated Tests
```bash
npm run build   # Must pass with 0 errors, 0 warnings
```

### Manual Verification
- Visual check that all cards have consistent shadows
- Verify the video filter buttons work
- Verify YouTube thumbnails load
- Check text contrast on all sections (no white-on-white)
- Verify mobile responsive layout for Videos section
