## Goal
Convert the "Where our students get in" section from a static grid into a horizontally auto-scrolling marquee, mirroring the country flags strip.

## Changes

### `src/components/university-cloud.tsx`
- Replace the `<ul>` grid with the same marquee structure used in `countries-strip.tsx`:
  - Outer wrapper with side fade (`maskImage` linear-gradient transparent → black → transparent).
  - Inner flex row `animate-flag-marquee` rendering `[...schools, ...schools]` for seamless loop.
  - Each item: emblem image (h-14 w-14 object-contain) + university name in serif, side-by-side, with horizontal padding between items.
- Keep the existing eyebrow heading "Where our students get in".
- Preserve all 12 universities and their imported icons.
- Add `role="marquee"` and `aria-label="Top university placements"` on the scroll container.
- Hover effect: subtle text color shift to primary (kept from current).

### Reused styles
- Uses the existing `animate-flag-marquee` keyframe already defined in `src/styles.css` (same one powering the flags strip), so no CSS changes needed.

## Out of scope
- No changes to flags strip, routes, or other components.
- No new assets; existing university PNGs are reused.
