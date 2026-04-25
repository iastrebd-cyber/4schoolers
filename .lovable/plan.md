# 4Schoolers Real Content Update

Six grouped changes. No removals — only edits and additions. Existing color scheme, typography, and components are preserved.

---

## 1. Contact info (global)

Replace placeholder data everywhere with the real values:
- Phone: **(781) 789-4789** (`tel:+17817894789`)
- Email: **help@4schoolers.com**
- Address: **1309 Beacon Street, Brookline, MA**

Files:
- `src/components/site-footer.tsx` — phone, email, address line
- `src/routes/contact.tsx` — phone, hours, email contact card, address
- `src/components/mobile-sticky-cta.tsx` — `tel:` href
- `src/routes/about.tsx` — add "Founded in 2015" line in story copy

---

## 2. Team page + homepage section

**New route `src/routes/team.tsx`** — `/team` with full bios for all 9 members (Irina Jitomirskaia, Olga Katkova, Elena Aristarkhova, Alexander Lukyanov, Zlatko Vasilkoski, Alexander Aristarkhov, Daniyar Aubekerov, Yenchi Kuo, Philippe Izedian). Each card: avatar circle (initials on gold/primary gradient), name, title, bio. 3-col desktop / 1-col mobile grid. Includes head() meta.

**New homepage component `src/components/team-preview.tsx`** — "Meet Our Experts" section showing 3 featured members (Irina, Olga, Elena) with link to `/team`.

**Update `src/routes/about.tsx`** — replace fictional `team` array (Whitfield/Aldridge/Raghavan/Okonkwo) with real members; update story copy to reference Irina + 2015 founding; link to `/team` for full team.

**Update `src/components/site-header.tsx`** — add `{ to: "/team", label: "Team" }` to navLinks.

---

## 3. Countries section

**New component `src/components/countries-strip.tsx`** — section "Our Students Come From Around the World", subtitle "24+ countries. One mission: your child's success." Renders 24 country chips (flag emoji + name) as a responsive flex-wrap pill grid using existing `Section`/`FadeIn`/`Eyebrow`. Mounted on homepage between `UniversityCloud` and `QuizCTA`.

---

## 4. Four new service pages + dropdown

**New routes** (each with own head() meta, hero, bullet list, CTA — same layout as existing `/services` segments):
- `src/routes/services.athletic-recruitment.tsx` → `/services/athletic-recruitment`
- `src/routes/services.bs-md-programs.tsx` → `/services/bs-md-programs`
- `src/routes/services.graduate-admissions.tsx` → `/services/graduate-admissions`
- `src/routes/services.transfer-admissions.tsx` → `/services/transfer-admissions`

**Update `src/routes/services.tsx`** — add a "More specialized programs" grid below the 4 main services linking to the 4 new pages.

**Update `src/components/site-header.tsx`** — convert "Services" link into a hover/click dropdown (using existing shadcn `NavigationMenu` or simple Popover) listing all 8 service pages on desktop; mobile menu shows them as an expandable nested list.

---

## 5. Real testimonials

**Update `src/components/testimonials.tsx`** — replace the 4 fictional quotes with the 5 verified quotes (Dartmouth student, parent of two, parent ignited math passion, international parent via Skype, parent of failing-math-to-PhD child). Carousel structure stays identical.

---

## 6. "Beyond the Classroom" homepage section

**New component `src/components/specialty-programs.tsx`** — title "Programs That Set Our Students Apart", 3-card grid:
1. 🏆 Math Olympiad & Competition Camp
2. ☀️ Summer Masterclasses — Cape Cod & North Shore
3. ♟️ Chess, Art & Robotics for K–8

Mounted on homepage **between `ServicesGrid` and `SuccessTimeline`** (the "journey" block).

---

## Homepage assembly (`src/routes/index.tsx`)

New order:
```
Hero
TrustBento
ServicesGrid
SpecialtyPrograms        ← new
SuccessTimeline
TeamPreview              ← new
Testimonials
UniversityCloud
CountriesStrip           ← new
QuizCTA
FAQ
```

---

## Technical notes

- All new routes use `createFileRoute` with `head()` meta (title, description, og:title, og:description) per project convention.
- New components reuse `Section`, `FadeIn`, `Eyebrow` for consistent spacing/animation.
- Avatar circles are CSS-only (initials on gradient) — no image assets required.
- Country flags use native emoji; one chip = `<span>🇰🇿</span> Kazakhstan` styled as rounded pill with border + secondary bg.
- Services dropdown: desktop uses `NavigationMenu` from shadcn; mobile menu uses a collapsible block beneath the "Services" entry.
- No DB or auth changes. No new dependencies.
- After file creation, `routeTree.gen.ts` regenerates automatically — do not edit manually.
