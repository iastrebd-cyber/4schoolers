import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Section, FadeIn } from "@/components/section";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// ─── Search params ─────────────────────────────────────────────────────────
type ServicesSearch = { source?: "ads" };

export const Route = createFileRoute("/services")({
  validateSearch: (search: Record<string, unknown>): ServicesSearch => ({
    source: search.source === "ads" ? "ads" : undefined,
  }),
  head: () => ({
    meta: [
      {
        title:
          "Academic Tutoring & College Admissions Counseling | 4Schoolers Brookline MA",
      },
      {
        name: "description",
        content:
          "Expert tutoring, SAT prep, and college admissions counseling in Brookline, MA — also fully online. Serving students in 25+ countries. Free 30-minute consultation.",
      },
      {
        property: "og:title",
        content:
          "Academic Tutoring & College Admissions Counseling | 4Schoolers Brookline MA",
      },
      {
        property: "og:description",
        content:
          "Honest pricing, real internship placements, and a free 30-minute conversation. No pressure.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LocalBusiness",
              name: "4Schoolers",
              url: "https://4schoolers.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "1309 Beacon Street",
                addressLocality: "Brookline",
                addressRegion: "MA",
                postalCode: "02446",
                addressCountry: "US",
              },
              telephone: "[YOUR PHONE]",
              priceRange: "$$$",
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How much does college admissions counseling cost?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "[YOUR ANSWER]",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you offer payment plans?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "[YOUR ANSWER]",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you work with international students?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "[YOUR ANSWER]",
                  },
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: ServicesPage,
});

// ─── Reusable bits ─────────────────────────────────────────────────────────

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="font-serif text-3xl font-semibold text-primary lg:text-4xl">
        {value}
      </span>
      <span className="max-w-[14ch] text-xs text-muted-foreground lg:text-sm">
        {label}
      </span>
    </div>
  );
}

function PriceRow({
  name,
  price,
  desc,
  note,
}: {
  name: string;
  price: string;
  desc?: string;
  note?: string;
}) {
  return (
    <div className="py-4">
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-base text-primary">{name}</span>
        <span className="mx-1 flex-1 self-end border-b border-dotted border-border/70" />
        <span className="text-sm font-medium text-primary tabular-nums">
          {price}
        </span>
      </div>
      {desc && (
        <p className="mt-1 max-w-prose text-sm text-muted-foreground">
          {desc}
        </p>
      )}
      {note && (
        <p className="mt-1 text-xs italic text-muted-foreground">{note}</p>
      )}
    </div>
  );
}

function PricingCard({
  name,
  desc,
  price,
  context,
  bullets,
  recommended,
}: {
  name: string;
  desc: string;
  price: string;
  context: string;
  bullets: string[];
  recommended?: boolean;
}) {
  return (
    <div className="relative flex flex-col rounded-xl border border-primary/15 bg-background p-7 lg:p-8">
      {recommended && (
        <p className="mb-4 text-xs italic text-[var(--gold)]">
          Most families choose this
        </p>
      )}
      <h3 className="font-serif text-2xl font-semibold text-primary">{name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {desc}
      </p>
      <div className="mt-6 border-t border-border/60 pt-5">
        <div className="font-serif text-3xl text-primary">{price}</div>
        <div className="mt-1 text-xs text-muted-foreground">{context}</div>
      </div>
      <ul className="mt-6 space-y-2.5">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2.5 text-sm text-foreground/85">
            <span
              aria-hidden
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/50"
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/contact"
        className="mt-7 inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        Learn more & book a call →
      </Link>
    </div>
  );
}

// ─── Tab styling helpers ───────────────────────────────────────────────────
const tabListClass =
  "flex h-auto w-full flex-wrap justify-start gap-x-8 gap-y-2 rounded-none border-b border-border bg-transparent p-0 text-muted-foreground";
const tabTriggerClass =
  "rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-1 text-sm font-normal text-muted-foreground shadow-none transition-colors data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none hover:text-primary";

// ─── Page ──────────────────────────────────────────────────────────────────

function ServicesPage() {
  const [tab, setTab] = useState("admissions");

  return (
    <>
      {/* ─── 1. OPENING ─────────────────────────────────────────────────── */}
      <Section className="pt-20 pb-14 text-center lg:pt-28 lg:pb-20">
        <FadeIn>
          <h1 className="mx-auto max-w-3xl font-serif text-4xl font-semibold leading-[1.1] text-primary text-balance sm:text-5xl lg:text-6xl">
            Every Student Has a Path. We Help Find It.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-foreground/75 lg:text-lg">
            Whether your child needs weekly support in algebra or a complete
            roadmap to their dream university — we offer the right level of
            guidance for where they are right now. Our{" "}
            <Link to="/services" className="text-primary underline-offset-4 hover:underline">
              college admissions counseling
            </Link>{" "}
            in Brookline, MA serves students across the US and in 25+ countries
            worldwide.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4">
            <Stat value="97%" label="students admitted to a target school" />
            <Stat value="25+" label="countries served" />
            <Stat value="10+" label="years of experience" />
            <Stat value="$0" label="cost of your first conversation" />
          </div>
        </FadeIn>
      </Section>

      {/* ─── 2. HOW WE WORK ─────────────────────────────────────────────── */}
      <Section className="border-t border-border/60 py-20 lg:py-24">
        <FadeIn>
          <h2 className="font-serif text-3xl font-semibold text-primary lg:text-4xl">
            What working with us looks like
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="relative mt-14 grid gap-12 lg:grid-cols-3 lg:gap-8">
            <div
              aria-hidden
              className="absolute left-[16%] right-[16%] top-6 hidden border-t border-dotted border-border lg:block"
            />
            {[
              {
                n: "1",
                title: "A free conversation",
                body: "We start by understanding your student's goals, timeline, and what support would actually help.",
              },
              {
                n: "2",
                title: "A tailored plan",
                body: "We recommend the right service — nothing more, nothing less. No upselling.",
              },
              {
                n: "3",
                title: "Ongoing support",
                body: "Your student works with a dedicated counselor from first session to final decision.",
              },
            ].map((s) => (
              <div key={s.n} className="relative flex flex-col items-start lg:items-center lg:text-center">
                <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-background font-serif text-lg text-primary">
                  {s.n}
                </div>
                <h3 className="mt-5 font-serif text-xl font-medium text-primary">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* ─── 3. SERVICES & PRICING ──────────────────────────────────────── */}
      <Section className="border-t border-border/60 py-20 lg:py-24">
        <FadeIn>
          <h2 className="font-serif text-3xl font-semibold text-primary lg:text-4xl">
            Our services
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            All sessions are available in-person at our Brookline office or
            fully online.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Tabs value={tab} onValueChange={setTab} className="mt-12">
            <TabsList className={tabListClass}>
              <TabsTrigger value="admissions" className={tabTriggerClass}>
                College Admissions
              </TabsTrigger>
              <TabsTrigger value="tutoring" className={tabTriggerClass}>
                Tutoring & Test Prep
              </TabsTrigger>
              <TabsTrigger value="internships" className={tabTriggerClass}>
                Internships
              </TabsTrigger>
              <TabsTrigger value="enrichment" className={tabTriggerClass}>
                Enrichment
              </TabsTrigger>
              <TabsTrigger value="international" className={tabTriggerClass}>
                International Students
              </TabsTrigger>
            </TabsList>

            {/* ── Tab 1: Admissions ── */}
            <TabsContent value="admissions" className="mt-10">
              <p className="max-w-2xl text-base text-foreground/80">
                We guide students from early planning through acceptance — at
                whatever level of support fits your family.
              </p>

              <div className="mt-10 grid gap-6 lg:grid-cols-3">
                <PricingCard
                  name="[PLACEHOLDER — Foundation]"
                  desc="[PLACEHOLDER — one sentence describing this package.]"
                  price="$[PLACEHOLDER]"
                  context="[PLACEHOLDER — e.g. one-time · sophomore year]"
                  bullets={[
                    "[PLACEHOLDER — bullet 1]",
                    "[PLACEHOLDER — bullet 2]",
                    "[PLACEHOLDER — bullet 3]",
                    "[PLACEHOLDER — bullet 4]",
                  ]}
                />
                <PricingCard
                  recommended
                  name="[PLACEHOLDER — Comprehensive]"
                  desc="[PLACEHOLDER — one sentence describing this package.]"
                  price="$[PLACEHOLDER]"
                  context="[PLACEHOLDER — one-time · junior–senior year]"
                  bullets={[
                    "[PLACEHOLDER — bullet 1]",
                    "[PLACEHOLDER — bullet 2]",
                    "[PLACEHOLDER — bullet 3]",
                    "[PLACEHOLDER — bullet 4]",
                    "[PLACEHOLDER — bullet 5]",
                  ]}
                />
                <PricingCard
                  name="[PLACEHOLDER — Senior Year]"
                  desc="[PLACEHOLDER — one sentence describing this package.]"
                  price="$[PLACEHOLDER]"
                  context="[PLACEHOLDER — one-time · senior year only]"
                  bullets={[
                    "[PLACEHOLDER — bullet 1]",
                    "[PLACEHOLDER — bullet 2]",
                    "[PLACEHOLDER — bullet 3]",
                    "[PLACEHOLDER — bullet 4]",
                  ]}
                />
              </div>

              <div className="mt-16 border-t border-border/60 pt-10">
                <h3 className="font-serif text-xl text-primary">
                  Need less than a full package?
                </h3>
                <div className="mt-4 max-w-2xl divide-y divide-border/60">
                  <PriceRow name="[PLACEHOLDER — Essay review (per essay)]" price="$[X]" />
                  <PriceRow name="[PLACEHOLDER — School list consultation]" price="$[X]" />
                  <PriceRow name="[PLACEHOLDER — Activity strategy session]" price="$[X]" />
                  <PriceRow name="[PLACEHOLDER — Final application review]" price="$[X]" />
                </div>
              </div>
            </TabsContent>

            {/* ── Tab 2: Tutoring ── */}
            <TabsContent value="tutoring" className="mt-10">
              <p className="max-w-2xl text-base text-foreground/80">
                From weekly homework help to full{" "}
                <Link to="/services" className="text-primary underline-offset-4 hover:underline">
                  SAT prep
                </Link>{" "}
                in Boston — structured support for every subject and goal.
              </p>

              <div className="mt-10 max-w-3xl">
                <h3 className="font-serif text-xl text-primary">Math & Science</h3>
                <div className="mt-3 divide-y divide-border/60">
                  <PriceRow name="[PLACEHOLDER — Algebra / Geometry]" price="$[X]/hr" />
                  <PriceRow name="[PLACEHOLDER — Pre-calc / AP Calc]" price="$[X]/hr" />
                  <PriceRow name="[PLACEHOLDER — Biology / Chemistry / Physics]" price="$[X]/hr" />
                </div>
              </div>

              <div className="mt-12 max-w-3xl">
                <h3 className="font-serif text-xl text-primary">
                  SAT · ACT · SSAT · ISEE
                </h3>
                <div className="mt-3 divide-y divide-border/60">
                  <PriceRow
                    name="[PLACEHOLDER — SAT full prep program]"
                    price="$[X]"
                    desc="[PLACEHOLDER — one short line about format and length]"
                  />
                  <PriceRow
                    name="[PLACEHOLDER — ACT full prep program]"
                    price="$[X]"
                    desc="[PLACEHOLDER — one short line about format and length]"
                  />
                  <PriceRow
                    name="[PLACEHOLDER — SSAT / ISEE prep]"
                    price="$[X]"
                    desc="[PLACEHOLDER — one short line about format and length]"
                  />
                </div>
              </div>

              <div className="mt-12 max-w-3xl">
                <h3 className="font-serif text-xl text-primary">
                  Writing & Languages
                </h3>
                <div className="mt-3 divide-y divide-border/60">
                  <PriceRow name="[PLACEHOLDER — English / Writing]" price="$[X]/hr" />
                  <PriceRow name="[PLACEHOLDER — ESL]" price="$[X]/hr" />
                  <PriceRow name="[PLACEHOLDER — Spanish / French / Mandarin]" price="$[X]/hr" />
                </div>
              </div>

              <p className="mt-12 text-sm text-muted-foreground">
                Have questions about which option is right?{" "}
                <Link
                  to="/contact"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Let's talk →
                </Link>
              </p>
            </TabsContent>

            {/* ── Tab 3: Internships ── */}
            <TabsContent value="internships" className="mt-10">
              <div className="rounded-xl bg-[var(--sage-soft)] p-6 lg:p-7">
                <p className="text-base leading-relaxed text-[var(--sage)]">
                  Unlike programs that simulate work experience, 4Schoolers
                  places students in real internships — at companies, law firms,
                  research labs, and nonprofits in Boston and online.
                </p>
              </div>

              <div className="mt-10 max-w-3xl divide-y divide-border/60">
                <PriceRow
                  name="[PLACEHOLDER — Research lab placement]"
                  price="$[X]"
                  desc="[PLACEHOLDER — one short line]"
                />
                <PriceRow
                  name="[PLACEHOLDER — Law / Policy internship]"
                  price="$[X]"
                  desc="[PLACEHOLDER — one short line]"
                />
                <PriceRow
                  name="[PLACEHOLDER — Tech / Startup internship]"
                  price="$[X]"
                  desc="[PLACEHOLDER — one short line]"
                />
                <PriceRow
                  name="[PLACEHOLDER — Nonprofit project]"
                  price="$[X]"
                  desc="[PLACEHOLDER — one short line]"
                />
              </div>
            </TabsContent>

            {/* ── Tab 4: Enrichment ── */}
            <TabsContent value="enrichment" className="mt-10">
              <p className="max-w-2xl text-base text-foreground/80">
                For students who want to go beyond the standard curriculum —
                competitions, research, summer programs.
              </p>

              <div className="mt-10 max-w-3xl divide-y divide-border/60">
                <PriceRow
                  name="[PLACEHOLDER — Math Olympiad coaching]"
                  price="$[X]"
                  desc="[PLACEHOLDER — short description]"
                />
                <PriceRow
                  name="[PLACEHOLDER — Research mentorship]"
                  price="$[X]"
                  desc="[PLACEHOLDER — short description]"
                />
                <PriceRow
                  name="[PLACEHOLDER — Writing intensive]"
                  price="$[X]"
                  desc="[PLACEHOLDER — short description]"
                />
                <PriceRow
                  name="[PLACEHOLDER — Summer Masterclass]"
                  price="$[X]"
                  desc="[PLACEHOLDER — short description]"
                  note="Limited enrollment · Summer 2025"
                />
              </div>
            </TabsContent>

            {/* ── Tab 5: International ── */}
            <TabsContent value="international" className="mt-10">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 text-2xl">
                <span aria-hidden>🇰🇿</span>
                <span aria-hidden>🇨🇦</span>
                <span aria-hidden>🇰🇷</span>
                <span aria-hidden>🇬🇧</span>
                <span aria-hidden>🇦🇪</span>
                <span aria-hidden>🇩🇪</span>
                <span aria-hidden>🇷🇺</span>
                <span aria-hidden>🇨🇳</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  and 17 more countries
                </span>
              </div>

              <p className="mt-6 max-w-2xl text-base text-foreground/80">
                All sessions are conducted online. We understand the
                international application process from the inside.
              </p>

              <div className="mt-10 max-w-3xl divide-y divide-border/60">
                <PriceRow
                  name="[PLACEHOLDER — International Foundation]"
                  price="$[X]"
                  desc="[PLACEHOLDER — short description]"
                />
                <PriceRow
                  name="[PLACEHOLDER — International Comprehensive]"
                  price="$[X]"
                  desc="[PLACEHOLDER — short description]"
                />
                <PriceRow
                  name="[PLACEHOLDER — UK / EU applications]"
                  price="$[X]"
                  desc="[PLACEHOLDER — short description]"
                />
                <PriceRow
                  name="[PLACEHOLDER — Visa / Documentation support]"
                  price="$[X]"
                  desc="[PLACEHOLDER — short description]"
                />
              </div>
            </TabsContent>
          </Tabs>
        </FadeIn>
      </Section>

      {/* ─── 4. ONE TESTIMONIAL ─────────────────────────────────────────── */}
      <Section className="border-t border-border/60 py-24 text-center lg:py-32">
        <FadeIn>
          <blockquote className="mx-auto max-w-3xl">
            <p className="font-serif text-2xl italic leading-relaxed text-primary/90 lg:text-3xl">
              “[PLACEHOLDER — add your best parent or student quote here. Two
              or three sentences works best — warm, specific, and honest.]”
            </p>
            <footer className="mt-8 text-sm text-muted-foreground">
              — Parent of [Name], admitted to [School], [Year]
            </footer>
          </blockquote>
        </FadeIn>
      </Section>

      {/* ─── 5. FAQ ─────────────────────────────────────────────────────── */}
      <Section className="border-t border-border/60 py-20 lg:py-24">
        <FadeIn>
          <h2 className="font-serif text-3xl font-semibold text-primary lg:text-4xl">
            Questions families usually ask
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            We believe in being completely honest about how we work and what to
            expect.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: "How much does college admissions counseling cost?",
                  a: "[PLACEHOLDER — Be direct. Give the price range. Explain that we don't believe in hiding numbers — and that the right package depends on when you start and how much support your student needs.]",
                },
                {
                  q: "Is the free consultation actually free?",
                  a: "[PLACEHOLDER — Yes. 30 minutes, no credit card, no obligation. After the call you'll receive a written recommendation by email — even if you decide we're not the right fit.]",
                },
                {
                  q: "Do you offer payment plans?",
                  a: "[PLACEHOLDER — Yes. Packages over $[X] can be split into monthly payments at no extra cost. We'll work with you to find an arrangement that fits your family.]",
                },
                {
                  q: "Can we start with just tutoring and add counseling later?",
                  a: "[PLACEHOLDER — Absolutely. Many families begin with weekly tutoring and add admissions support in junior or senior year. Tutoring clients receive a discount on counseling packages.]",
                },
                {
                  q: "Do you guarantee admission to specific schools?",
                  a: "[PLACEHOLDER — No one can — and any consultant who claims otherwise is being dishonest. What we can share is that 97% of our students are admitted to a school on their target list.]",
                },
                {
                  q: "How are you different from IvyWise or Empowerly?",
                  a: "[PLACEHOLDER — Lower prices for comparable senior-consultant time, real internship placement (not simulations), an in-person Boston office, and a dedicated international specialist on the team.]",
                },
                {
                  q: "Do you work with students outside the US?",
                  a: "[PLACEHOLDER — Yes. We currently support students in 25+ countries, all online. We're familiar with the application process from inside many international school systems.]",
                },
                {
                  q: "When should we start?",
                  a: "[PLACEHOLDER — Earlier is better — sophomore or junior year gives the most room to build a meaningful profile. But we also work with seniors and have a track record of strong outcomes even on a tight timeline.]",
                },
                {
                  q: "What subjects do you tutor?",
                  a: "[PLACEHOLDER — Math through AP Calculus, all core sciences, English and writing, Spanish, French, Mandarin, and ESL. If you have a more specific request, ask us — we likely have someone.]",
                },
                {
                  q: "What is the Summer Masterclass?",
                  a: "[PLACEHOLDER — A two-week residential program on Cape Cod / North Shore for ages 13–17. Limited spots. Combines academics, mentorship, and time outdoors. Details available on request.]",
                },
              ].map((item) => (
                <AccordionItem
                  key={item.q}
                  value={item.q}
                  className="border-b border-border/60"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-normal text-primary hover:no-underline data-[state=open]:text-primary">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pl-1 pr-6 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </FadeIn>
      </Section>

      {/* ─── 6. CLOSING ─────────────────────────────────────────────────── */}
      <Section className="border-t border-border/60 py-24 text-center lg:py-32">
        <FadeIn>
          <p className="text-xs italic tracking-[0.18em] text-[var(--gold)]">
            NEXT STEP
          </p>
          <h2 className="mt-5 font-serif text-3xl font-semibold text-primary lg:text-4xl">
            Start with a conversation.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Tell us about your student — we'll suggest the right path, honestly
            and without pressure.
          </p>
          <div className="mt-9 flex justify-center">
            <Link
              to="/contact"
              className={cn(
                "inline-flex items-center justify-center rounded-md border border-primary bg-transparent px-7 py-3 text-sm font-medium text-primary transition-colors",
                "hover:bg-primary hover:text-primary-foreground",
              )}
            >
              Schedule a free 30-minute call
            </Link>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            No credit card. No commitment. A real conversation.
          </p>
        </FadeIn>
      </Section>
    </>
  );
}
