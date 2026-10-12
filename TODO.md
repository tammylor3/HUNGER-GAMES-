# Library of Panem outcomes

- Build a centered "The Hunger Games Library" page with the subtitle "Five books. One rebellion." in a dark cinematic theme with charcoal/near-black ash-and-ember texture, subtle vignette, warm gold shelf lighting, reflections, and shadows.
- Seed a local JSON file with all five requested books and id, title, publication year, series order, chronological order, original spoiler-free blurb, spine color, and icon fields.
- Render each book as a distinct tall, chunky 3D volume with visible page edges, rounded corners, height variation, vertical condensed/monospace spine typography, specified per-book colors, and icons.
- Add hover and keyboard-focus feedback that lifts and tilts the spine with a soft glow, including a gentle illuminated mockingjay treatment.
- On selection, animate the chosen book out of the shelf into an enlarged original typographic front cover on the left while neighboring books slide aside; show a detail card with title, year, blurb, and an "ABOUT THIS BOOK →" placeholder link.
- Support Escape or outside-click close, left/right arrow book navigation, an animated Publication Order / Story Chronology toggle, responsive mobile bottom-sheet presentation, accessible focus/ARIA states, and prefers-reduced-motion behavior.
- Implement with React + Tailwind, CSS 3D transforms, and Framer Motion spring animations in the 300–500ms range; verify the build and publish the site.
