# The Hunger Games Library — Project Documentation

## Project purpose

This project is an interactive bookshelf experience for the five published books in Suzanne Collins’s *The Hunger Games* universe. It contains two visual editions:

- `/` — the original dark, cinematic **The Hunger Games Library**.
- `/capitol` — the separate, luxury-inspired **The Capitol Archive** edition.

The application is a React/Vite site with Framer Motion transitions, CSS 3D book treatment, JSON seed data, responsive layouts, keyboard support, and reduced-motion handling.

## Requirements captured from the project brief

The original bookshelf brief requested:

- Five books shown as tall, chunky 3D spines on a shelf.
- Seed data for *The Hunger Games* (2008), *Catching Fire* (2009), *Mockingjay* (2010), *The Ballad of Songbirds and Snakes* (2020), and *Sunrise on the Reaping* (2025).
- Book metadata including publication year, publication/series order, chronological order, original spoiler-free blurb, spine treatment, and icon.
- Hover lift and tilt, click-to-open cover, keyboard navigation, Escape/click-outside dismissal, responsive mobile behavior, accessible focus states, and reduced-motion support.
- A responsive visual system that could support official cover artwork in the Capitol edition.

## Change history

### 1. Initial interactive Library of Panem

The first edition established the core product:

- A dark cinematic bookshelf interface.
- Five Panem books rendered as individual 3D volumes.
- JSON-backed book data in `src/data/books.json`.
- CSS 3D transforms for spine depth, page edges, shadows, and shelf placement.
- Framer Motion for spring-based book movement.
- Selected-book details with title, year, original blurb, and a placeholder action.
- Responsive layout and mobile bottom-sheet behavior.
- Keyboard navigation and reduced-motion support.

### 2. Separate Capitol Archive edition

A separate `/capitol` route was added rather than replacing the original homepage. This edition introduced a more polished Capitol-citizen direction:

- Pearl, ivory, graphite, jewel-tone, and gold palette.
- Clean geometric typography.
- More ceremonial spacing, gilded accents, and refined shelf presentation.
- Separate seed data in `src/data/capitol-books.json`.
- Separate page implementation in `src/CapitolArchive.tsx`.
- Separate visual system in `src/capitol.css`.

### 3. Official cover artwork

The Capitol edition was updated to use official front-cover artwork rather than typographic placeholder covers:

- Official covers were added for all five books.
- Cover assets live in `public/covers/` as local fallbacks.
- Managed project-storage paths are recorded in `src/data/capitol-books.json`.
- The selected-book view now displays the official cover image with a restrained frame treatment.

### 4. Spine colors matched to the book covers

Each spine was revised to echo the dominant color language of its corresponding official cover:

- *Sunrise on the Reaping* — rich purple.
- *The Ballad of Songbirds and Snakes* — deep green.
- *Mockingjay* — pale blue.
- *Catching Fire* — ember red/orange.
- *The Hunger Games* — coal black with gold detailing.

The shelf order was also matched to the supplied reference arrangement.

### 5. Shelf cleanup and reference matching

The shelf was progressively refined in response to visual feedback:

- Removed the divider between the ordering controls and the books.
- Removed the decorative border surrounding the bookshelf.
- Removed the larger bookshelf panel edge/background treatment.
- Removed pink tinting from the shelf surface.
- Removed later overrides that were restoring the unwanted rectangular shelf area.
- Kept the bookshelf visually open, neutral, and focused on the five spines.

### 6. Richer Capitol visual direction

The Capitol edition was given a richer luxury aesthetic:

- Gilded accents and warm marble/ivory warmth.
- Graphite contrast and ceremonial shadows.
- A more premium, editorial presentation while preserving the clean layout.
- The upper-left “Capitol Archive” shelf label was removed at the user’s request.

### 7. Typography update

The primary Capitol typography was changed to **Manrope Medium**:

- Medium-weight geometric/neo-grotesque sans-serif treatment.
- Slightly tight tracking for a cleaner, more architectural appearance.
- Consistent use across the heading, spine labels, shelf metadata, and detail card.

### 8. Cover corrections

Three cover assets were replaced after visual review:

- *Catching Fire* was corrected from a back-cover image to a sharp front cover.
- *Mockingjay* was replaced with a clearer front-cover asset.
- *The Ballad of Songbirds and Snakes* was replaced with a clearer front-cover asset.

Both managed storage references and local fallbacks were updated.

### 9. Simplified Capitol page

The Capitol page was stripped back to the title and bookshelf. The following visible sections were removed:

- `PANEM CAPITOL LIBRARY`
- `EST. YEAR 1`
- `THE NATION'S MOST EXQUISITE COLLECTION`
- `Five volumes. Presented for your pleasure.`
- `ARRANGE BY`
- `Order of Publication`
- `Order of Events`
- `COLLECTION I`
- `FIVE VOLUMES`
- `SELECT A VOLUME ✦ ARROWS TO EXPLORE`

The main heading **The Capitol Archive** and the five-book shelf remain.

### 10. Non-modal pull-out book interaction

A separate component was created in `src/CapitolPullout.tsx` for a pull-out interaction inspired by the supplied reference image:

- Clicking a spine pulls its official cover forward with a 3D rotation and spring animation.
- The remaining books stay visible on the shelf rather than being covered by a modal overlay.
- A compact floating description card appears beside the pulled-out cover.
- The card contains the selected title, year, spoiler-free blurb, and close control.
- Clicking outside the quick view or using the close button dismisses it.
- The layout becomes a compact mobile sheet on narrow screens.
- The implementation preserves keyboard selection and reduced-motion behavior.

### 11. Primary reading action

The card’s `READ THIS EDITION →` action was changed to open an Amazon search for the selected book and Suzanne Collins in a new tab.

The interim retailer row was removed so the card now contains only the single Amazon-linked primary action.

### 12. Shelf pick-off animation

The selected-book interaction was refined to feel like someone is physically taking a volume from the shelf:

- The selected spine shifts forward, lifts slightly, leans toward the viewer, and becomes the active volume.
- Neighboring spines ease a few pixels away from the selected position so the extraction reads clearly without obscuring the rest of the shelf.
- The official cover rises from below with a staged lift, rotation, scale-up, and settle into the non-modal pull-out view.
- The animation remains disabled or instantaneous under `prefers-reduced-motion`.

## Current source structure

```text
src/
  App.tsx                    Original Library of Panem homepage
  CapitolArchive.tsx         Separate Capitol Archive bookshelf route
  CapitolPullout.tsx         Non-modal pulled-out cover and detail card
  main.tsx                   Route entry point
  styles.css                 Original edition styles
  capitol.css                Capitol edition styles
  data/
    books.json               Original edition seed data
    capitol-books.json       Capitol edition seed data and cover paths
public/
  covers/                    Local official-cover fallbacks
  manus-routes.json          Declared application routes
```

## Interaction notes

- Select a book by clicking or focusing a spine and pressing Enter/Space.
- Use Escape or the close button to dismiss the pull-out.
- Use left/right arrow keys to move between books while a book is selected.
- The pulled-out cover and detail card are intentionally non-modal so the other books remain readable.
- The Amazon action is generated per selected title using a URL-encoded search query.
- Selecting a book uses a shelf-removal motion: the spine pulls forward while the cover lifts, rotates, and settles into the quick view.

## Validation and delivery

- Production build command: `pnpm build`
- Local development command: `pnpm dev`
- The final implementation was built successfully after the latest changes.
- The project was pushed to the requested GitHub repository:
  `https://github.com/tammylor3/HUNGER-GAMES-`

## Commit timeline

| Commit | Change |
| --- | --- |
| `ac13c2e` | Build interactive Library of Panem bookshelf |
| `49c1dec` | Add separate Capitol Archive edition |
| `23ca728` | Use official covers in Capitol Archive |
| `541bb65` | Match Capitol spines to official cover colors |
| `2967f57` | Remove divider above Capitol book list |
| `6ee3b34` | Refine Capitol typography system |
| `4811c29` | Match Capitol shelf spines to the supplied reference |
| `c12bceb` | Remove bookshelf frame border |
| `1eddabf` | Remove bookshelf panel background edge |
| `3a9e7ec` | Neutralize Capitol shelf surface |
| `e8d9401` | Remove remaining bookshelf panel background |
| `3e69553` | Enrich Capitol citizen visual language |
| `f8aa281` | Remove upper-left Capitol shelf label |
| `0390ffa` | Use Manrope Medium in Capitol Archive |
| `f40d44b` | Fix Capitol front-cover assets |
| `57610ac` | Simplify Capitol Archive bookshelf view |
| `6200b46` | Add non-modal Capitol book pullout |
| `d2a98a6` | Add book reading destination links |
| `0e76d2e` | Link primary book action to Amazon |
| `dc87ac6` | Remove retailer links from pullout card |
| pending | Add shelf pick-off selection animation |

## Repository

The source is intended to be maintained in:

**https://github.com/tammylor3/HUNGER-GAMES-**
