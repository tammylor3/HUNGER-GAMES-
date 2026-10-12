# Panem bookshelf editions

This project contains two separate visual editions of the interactive Panem bookshelf:

- `/` — **The Hunger Games Library**, the original dark cinematic archive.
- `/capitol` — **The Capitol Archive**, a blush, orchid, pearl, and gold Capitol glam edition.

Both editions use React, Tailwind, CSS 3D transforms, Framer Motion, local JSON seed data, keyboard navigation, responsive mobile bottom sheets, and reduced-motion support.

## Run locally

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

Seed data lives in `src/data/books.json` and `src/data/capitol-books.json`; the route manifest is `public/manus-routes.json`.

## Documentation

See [`PROJECT_DOCUMENTATION.md`](./PROJECT_DOCUMENTATION.md) for the complete record of the requested design changes, visual revisions, interaction updates, source structure, validation notes, and commit timeline.
