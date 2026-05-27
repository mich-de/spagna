# Implementation Plan — Costa de Nerja / Maro Integration

This plan outlines the integration of **Costa de Nerja / Maro** (eastern Costa del Sol, Malaga) into the travel dashboard. We will enrich the static JSON data files under the `data/` folder, adding beautiful beaches, nightlife hubs, typical regional dishes, local experiences, top tourist attractions, and inspirational travel videos. Since the dashboard components dynamically load and filter by zones directly from these files, this data enrichment will update the frontend automatically.

We will also add "Nerja" as a 5th comparison base in the strategic base selection table to help the user weigh its pros, cons, and characteristics.

## Proposed Changes

### 1. Data Enrichment Component-by-Component

#### [MODIFY] [beaches.json](file:///d:/nodejs/spagna/data/beaches.json)
Append 3 iconic beaches from the Nerja/Maro area:
- **Playa de Burriana**: Main tourist beach, famous for water sports and wood-fired paella.
- **Playa de Maro**: Wild cove in the cliffs of the Maro-Cerro Gordo natural park.
- **Playa de Calahonda**: High-contrast, scenic cove directly below the Balcón de Europa.

#### [MODIFY] [restaurants.json](file:///d:/nodejs/spagna/data/restaurants.json)
Append 3 typical dining options in Nerja:
- **Chiringuito Ayo**: Landmark restaurant on Burriana beach, famous for giant pans of wood-fired paella.
- **El Pulguilla**: Traditional, lively tapas bar in the center of Nerja, known for seafood tapas served with drinks.
- **Restaurante Oliva**: Premium modern Andalusian fine dining restaurant in the heart of Nerja.

#### [MODIFY] [nightlife.json](file:///d:/nodejs/spagna/data/nightlife.json)
Append 1 nightlife entry for Nerja:
- **Plaza Tutti Frutti**: The primary nightlife district in Nerja with multiple bars and pubs.
- Include venues like **Cochran's Irish Pub** (terrace overlooking the sea) and **Agora Bar** (cocktails).

#### [MODIFY] [food.json](file:///d:/nodejs/spagna/data/food.json)
Append 3 regional delicacies related to Nerja:
- **Paella de Burriana (Ayo)**: Beach-cooked wood-fired paella.
- **Boquerones de Nerja**: Locally sourced fried anchovies.
- **Canaíllas**: Sea snails cooked with herbs and garlic.

#### [MODIFY] [local-experiences.json](file:///d:/nodejs/spagna/data/local-experiences.json)
Append 2 iconic experiences from the area:
- **Kayak ai Cliff di Maro**: Kayaking tour along the cliffs to discover caves and marine waterfalls.
- **Passeggiata al Balcón de Europa**: The traditional evening promenade (paseo) at the Balcón de Europa viewpoint.

#### [MODIFY] [attractions.json](file:///d:/nodejs/spagna/data/attractions.json)
Append 2 major landmarks:
- **Cueva de Nerja**: Prehistoric cave complex with spectacular stalactites.
- **Balcón de Europa**: Scenic viewpoint overlooking the Mediterranean built on a former fortress.

#### [MODIFY] [trip.json](file:///d:/nodejs/spagna/data/trip.json)
Append 1 YouTube video featuring Nerja to the `videos` array:
- **Nerja: The Jewel of Costa del Sol (4K)** (ID: `kYc5e1_N7E0`) to show walking tours and guide content.

#### [MODIFY] [bases.json](file:///d:/nodejs/spagna/data/bases.json)
Append "Nerja" to the base comparison system:
- Set stats: distance_airport_min: 50, distance_marbella_min: 70, parking_ease: 6, nightlife_level: 7, beach_quality: 10, authenticity: 8, cost_level: "medio", social_ease: 8.
- Add pros: beaches/coves, authentic white town feel, Balcón de Europa & Caves, Plaza Tutti Frutti nightlife.
- Add cons: distant from Marbella (western side), busy summer parking, less practical for Estepona/Ronda day-trips.

---

### 2. Documentation Updates

#### [MODIFY] [IMPLEMENTATION_PLAN.MD](file:///d:/nodejs/spagna/IMPLEMENTATION_PLAN.MD)
- Document the integration strategy and details.

#### [MODIFY] [TASKS.MD](file:///d:/nodejs/spagna/TASKS.MD)
- Add tasks for data modification, checking compile/hydration, and verification.

#### [MODIFY] [GEMINI.MD](file:///d:/nodejs/spagna/GEMINI.MD)
- Record current session details, including the addition of Costa de Nerja.

#### [MODIFY] [README.md](file:///d:/nodejs/spagna/README.md)
- Update with details about the new Nerja features.

---

## Verification Plan

### Automated Tests
- Run Next.js production build:
  ```bash
  npm run build
  ```
  Verify that the compiler finishes with `0 errors` and `0 warnings`.

### Manual Verification
- Launch the development server and verify:
  1. The beaches filter bar shows a "Nerja" button. Clicking it displays only Nerja beaches.
  2. The videos filter bar shows a "Nerja" button. Clicking it displays the new Nerja video.
  3. The base selection table renders 5 columns instead of 4, correctly sorting them by score and displaying the new Nerja card.
  4. The food, experiences, attractions, and nightlife sections display the new cards.
  5. The mobile horizontal scrolling carousels function correctly with the new items.
