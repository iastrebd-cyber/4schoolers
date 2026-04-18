
# 4Schoolers — Premium Rebuild Plan

A high-end, conversion-focused marketing site for an elite educational consulting agency, rebuilt with modern academic minimalism (Navy / White / Gold), Shadcn UI, and subtle Framer Motion animations.

## Design Direction
- **Palette**: Deep Navy `#0A1F44`, Off-white `#FAFAF7`, Gold accent `#C9A24C`, Charcoal text `#1A1A1A`
- **Typography**: Playfair Display (headings, Ivy League prestige) + Inter (body, Stripe-clean)
- **Motion**: Framer Motion fade-up on scroll, subtle pulse on primary CTA, smooth carousel transitions
- **Layout**: Generous whitespace, max-w containers, aspect-ratio images to prevent CLS

## Site Structure (separate routes for SEO)
- `/` — Home (hero, trust bento, services preview, timeline, testimonials, university logos, quiz CTA, FAQ)
- `/services` — Full services breakdown with LSI-keyword H2s
- `/about` — 150 years of experience, team, philosophy
- `/success-stories` — Expanded testimonials + placement results
- `/quiz` — Multi-step lead magnet "Find Your Admission Path"
- `/contact` — Booking + contact form
- `/resources` — Blog / guides hub (replaces "World Cup" type clutter)

## Key Components
1. **Sticky Navigation** — Logo left, simplified mega-menu (Services, About, Success, Resources), Gold "Book Strategy Session" CTA right. Mobile hamburger.
2. **Hero** — H1 "97% Success Rate in Elite College Admissions", subheadline, primary pulse CTA + secondary "Take the Quiz", subtle background motif.
3. **Trust Bento Grid** — 3-tile asymmetric grid: 98% Sibling Return Rate, 150+ Years Experience, 6× Higher Acceptance — with animated count-ups.
4. **Services Interactive Cards** — 4 cards (Admissions Counseling, Interview Prep, Internship Connections, Academic Enrichment) with hover lift, gold underline reveal, "Learn more" link to /services.
5. **Success Timeline** — Horizontal (desktop) / vertical (mobile) journey: Middle School → High School → Applications → Ivy Acceptance, with milestone dots and fade-in on scroll.
6. **Testimonial Carousel** — Shadcn Carousel, large pull-quote, student name/university, parent quotes interleaved, autoplay with pause-on-hover.
7. **University Logo Cloud** — Grayscale logos (Harvard, Yale, Brown, Princeton, Columbia, MIT, Stanford, UPenn) → color on hover.
8. **Multi-step Lead Quiz** — 4 steps with progress bar:
   1. Current grade (6th–12th selector)
   2. Target schools (multi-select chips)
   3. Main challenge (essays, test prep, activities, strategy)
   4. Contact info (name, email, phone) → success screen with calendar CTA
   Animated step transitions, persisted state, validation per step.
9. **FAQ Accordion** — Radix accordion, 8–10 common questions, schema-friendly markup for crawlability.
10. **Mobile Sticky CTA Bar** — Bottom-fixed "Call" + "Book" buttons, visible only on mobile, hides on scroll up.
11. **Footer** — Navy background, gold links, contact info, social, legal.

## Technical & SEO
- Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Single `<h1>` per page on the value prop; `<h2>` for service sections with LSI keywords ("College Admissions Consulting Boston", "Ivy League Interview Coaching", etc.)
- Per-route `head()` with unique title, description, og:title, og:description
- Aspect-ratio wrappers on all imagery
- Lazy-loaded carousel + below-fold sections
- Accessible: focus rings, reduced-motion respect, ARIA on accordion/carousel/quiz steps

## Out of Scope (for later)
- Backend submission of quiz data (Lovable Cloud) — quiz will validate + show success screen; wiring to DB/email can be added next
- Real CMS for blog/resources
- Multi-language support

