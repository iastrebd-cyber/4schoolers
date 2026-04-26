## Replace `CountriesStrip` with an infinite flag marquee

Rework `src/components/countries-strip.tsx` to render a continuous, seamless left-scrolling row of country flag emojis (no labels, no chips, no borders).

### Changes

**1. `src/components/countries-strip.tsx`**
- Keep the `Section` wrapper, `Eyebrow` ("Global community"), and the heading "Our students come from around the world."
- Replace the wrapped `<ul>` of flag/name pills with a marquee:
  - Outer container: `relative w-full overflow-hidden` with transparent background, no border. Optional left/right fade mask via `mask-image` for polish.
  - Inner track: `flex w-max gap-8 animate-flag-marquee` containing the flag list rendered **twice** back-to-back (so translating by exactly `-50%` produces a seamless loop).
  - Each flag: `<span className="text-[40px] leading-none select-none" aria-hidden>` (40px size as requested). Wrap full track with `role="marquee" aria-label="Countries we serve"`.
- Move the subtitle "24+ countries. One mission: your child's success." **below** the carousel.
- No pause on hover (continuous loop, no gap, no jump).

**2. `src/styles.css`** — append a keyframe + utility:
```css
@keyframes flag-marquee {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}
.animate-flag-marquee {
  animation: flag-marquee 45s linear infinite;
  will-change: transform;
}
@media (prefers-reduced-motion: reduce) {
  .animate-flag-marquee { animation: none; }
}
```

### Technical notes
- Duplicating the flag array exactly once and translating by `-50%` is the standard seamless-marquee technique — at the loop boundary the second copy is pixel-identical to the first, so there's no visible jump.
- 24 flags × 2 = 48 spans; lightweight, no JS animation needed.
- Mobile responsive automatically: track uses intrinsic width (`w-max`), `overflow-hidden` clips, flag size stays 40px on all viewports (per spec).
- No changes needed elsewhere; `index.tsx` already renders `<CountriesStrip />`.
