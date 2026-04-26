## Editorial Services & Pricing Page

A complete rebuild of `/services` in the spirit of Empowerly's pricing page — calm, editorial, advisor-tone. The current page is sales-heavy (gold filled CTAs, large headlines, "BOOK A STRATEGY SESSION") and shows no prices. We'll replace it with a quiet, structured pricing experience that leads with the journey, not the package.

The visual language stays consistent with the rest of the site (existing cream `--background`, navy `--primary`, gold `--gold`, Playfair Display serif, Inter sans) — these already match the requested palette closely enough that no global theme change is needed. The shift is in **layout and tone**, not in colors.

---

### What gets built

**1. New `/services` page (full rewrite of `src/routes/services.tsx`)**

Sections, top to bottom:

1. **Opening** — no hero image, no badge. Just centered serif H1 *"Every Student Has a Path. We Help Find It."*, one warm intro paragraph (mentions "college admissions counseling Brookline MA" naturally), and a single row of four quiet stats (number + small label, no boxes): 97% / 25+ / 10+ / $0.
2. **How we work** — three steps in a row connected by a dotted line (rendered with a subtle absolute-positioned border), no CTA: *A free conversation → A tailored plan → Ongoing support*.
3. **Services & pricing** — H2 "Our services" + muted subheading. A pill-tab nav (5 tabs: College Admissions, Tutoring & Test Prep, Internships, Enrichment, International Students). Active tab is navy underline only, no fill. Built with shadcn `Tabs` styled minimally.
   - **College Admissions tab**: 3 minimal pricing cards (cream bg, thin navy border, serif name, one-sentence desc, plain price, small muted price context, 4–5 dot bullets, text link "Learn more & book a call →" at bottom). Middle card has italic gold "Most families choose this" label on top — no badge, no fill. Below cards: divider + "Need less than a full package?" + à la carte 2-column list with dotted leader lines.
   - **Tutoring tab**: opens with one line (mentions "SAT prep Boston"), then 3 H3 subsections (Math & Science / SAT·ACT·SSAT·ISEE / Writing & Languages) as clean two-column rows (item left, price right, dotted leader), no cards. Closes with text link.
   - **Internships tab**: light sage-green callout (no border, rounded), then 4 services as rows.
   - **Enrichment tab**: intro line + rows. Summer Masterclass row has subtle "Limited enrollment · Summer 2025" muted note.
   - **International tab**: small flag emoji strip + intro + 4 package rows.
4. **One testimonial** — full-width cream section, centered large serif italic quote, attribution below. No carousel, no stars, no photo.
5. **FAQ** — H2 "Questions families usually ask" + subtext. Accordion built on existing `@/components/ui/accordion` (already chevron-rotates, has thin border-b separators) with custom styling: question text in normal weight navy, answer indented and muted, no filled open state. 10 questions exactly as specified, all with `[PLACEHOLDER]` answers.
6. **Closing** — gold italic eyebrow "Next step", serif H2 "Start with a conversation.", one line of body copy, single ghost button (navy border, navy text, transparent fill) "Schedule a free 30-minute call", small muted line below.

**Sage green** — no token exists yet, so we add `--sage: oklch(0.62 0.06 155)` and `--sage-soft: oklch(0.94 0.025 155)` to `:root` in `src/styles.css` for the internships callout.

**`?source=ads` variant**: read `useSearch` on the route, hide `<SiteHeader/>` and `<SiteFooter/>` when `source === "ads"`. Cleanest path: the route component renders inside `__root.tsx`'s shell, so we can't hide them from inside the page directly. Instead, expose a `hideChrome` flag on the route via `validateSearch`, and in `__root.tsx`'s `RootComponent` check `useMatches()` for the active route's search and conditionally hide header/footer/sticky CTA.

**JSON-LD schema**: inject via the route's `head()` `scripts` array (TanStack supports `scripts: [{ type: "application/ld+json", children: "..." }]`). Combine `@graph` of `LocalBusiness` (Brookline address, telephone `[YOUR PHONE]` placeholder, priceRange `$$$`) + `FAQPage` (the 3 specifically-requested questions: cost, payment plans, international, with `[YOUR ANSWER]` placeholders).

**Per-route SEO meta**: `head()` sets the requested title/description and `og:` text.

---

**2. Homepage strip (`src/routes/index.tsx`)**

Add a new `<ServicesQuietStrip/>` component between `<Hero/>` and `<TrustBento/>`. It's a single-row 3-column block on cream background (`bg-secondary/30`, thin top/bottom border):
*"Tutoring from $[X]/hr · Admissions packages from $[X] · Free first call"* + outline ghost button "See all services →" pointing to `/services`. No fill, no shadow.

New file: `src/components/services-quiet-strip.tsx`.

---

**3. Blog post footer note**

The project has `src/routes/resources.tsx` (the resources listing) but no blog-post detail route. Per spec ("at the bottom of every blog post"), we'll add the soft 2-line text block to the bottom of `resources.tsx` (the only resources/articles surface today). Plain text + simple Link to `/contact`, no button. If individual blog post routes are added later, the same component (`<SoftBlogFooterNote/>`) can be reused.

New file: `src/components/soft-blog-footer-note.tsx`.

---

**4. Navigation**

`Services` is **already** in the main nav as a NavigationMenu trigger pointing to `/services` and 4 sub-pages. No header change needed.

---

### Technical details

- **Tabs**: `@/components/ui/tabs` (shadcn) with `defaultValue="admissions"`. Override `TabsList` styling inline: `bg-transparent`, `gap-6`, no rounded fill. `TabsTrigger` styled: `data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-muted-foreground rounded-none px-1 pb-2 bg-transparent shadow-none`.
- **Pricing rows with dotted leaders**: a flex row with `flex-1` middle dotted span: `<span className="mx-3 flex-1 border-b border-dotted border-border self-end mb-1.5" />`.
- **Three-step "How we work" connector line**: each step is a flex column; the parent has a pseudo-element or single absolutely-positioned dotted line behind the row (`hidden lg:block absolute top-6 left-[16%] right-[16%] border-t border-dotted border-border`).
- **Ghost CTA button**: `<Button variant="outline" size="lg" className="border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground">`.
- **Search params for ads mode** on `/services`:
  ```ts
  validateSearch: (s: Record<string, unknown>) => ({
    source: s.source === "ads" ? "ads" as const : undefined,
  })
  ```
  Then in `__root.tsx`: use `useMatches()` to find the deepest match, read its `search.source`, set `hideChrome = source === "ads"`, conditionally render header/footer/sticky CTA.
- **JSON-LD via head**:
  ```ts
  scripts: [{
    type: "application/ld+json",
    children: JSON.stringify({ "@context": "...", "@graph": [ ... ] })
  }]
  ```
- **Sage tokens** in `styles.css` `:root`:
  ```css
  --sage: oklch(0.62 0.06 155);
  --sage-soft: oklch(0.94 0.025 155);
  ```
  Used as `bg-[var(--sage-soft)] text-[var(--sage)]` on the internships callout.
- **Existing services data** (the 4-service array currently in `services.tsx`) is **discarded** — the new page is fully content-driven by the spec.
- **Internal links**: text "college admissions" → `/services` (no `/college-admissions` route exists; we'll deep-link to the admissions tab via `/services?tab=admissions` once tab state can be URL-driven — for v1 we use plain `/services`). "SAT prep" → `/services` (test prep tab). "tutoring" → `/services`. "internship placement" → `/services`. "international students" → `/services`. (No separate routes exist for these slugs and creating 5 stub pages is out of scope; we link to the relevant tab anchor on /services. If you want each as its own route, say so.)

---

### Files

**Created**
- `src/components/services-quiet-strip.tsx`
- `src/components/soft-blog-footer-note.tsx`

**Modified**
- `src/routes/services.tsx` — full rewrite
- `src/routes/index.tsx` — insert `<ServicesQuietStrip/>` after `<Hero/>`
- `src/routes/resources.tsx` — append `<SoftBlogFooterNote/>` at bottom
- `src/routes/__root.tsx` — read `?source=ads` from active match, hide header/footer/sticky CTA when set
- `src/styles.css` — add `--sage` and `--sage-soft` tokens

---

### What stays as `[PLACEHOLDER]`

Per your spec, all of these remain `[PLACEHOLDER]` in the code for you to fill in later:
- 3 admissions package names, prices, and bullets
- All tutoring/test-prep/writing line items and prices
- 4 internship rows
- 4 enrichment rows (incl. Summer Masterclass)
- 4 international packages
- À la carte add-ons
- The single testimonial quote + attribution
- All 10 FAQ answers
- Calendly/booking URL on the closing CTA (defaults to `/contact` until provided)
- Phone number in JSON-LD
- Answers in the JSON-LD `FAQPage` graph
