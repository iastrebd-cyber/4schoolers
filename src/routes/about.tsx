import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, FadeIn, Eyebrow } from "@/components/section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — 150 Years of Admissions Expertise | 4Schoolers" },
      {
        name: "description",
        content:
          "Our team of former Ivy League admissions officers and seasoned consultants has helped 400+ families navigate elite college admissions.",
      },
      { property: "og:title", content: "About 4Schoolers" },
      {
        property: "og:description",
        content: "Meet the team behind 150+ years of combined elite admissions expertise.",
      },
    ],
  }),
  component: AboutPage,
});

const team = [
  { name: "Dr. Eleanor Whitfield", role: "Founder · Former Yale Admissions", years: "22 yrs" },
  { name: "Marcus Aldridge", role: "Senior Strategist · Harvard '02", years: "18 yrs" },
  { name: "Priya Raghavan", role: "Lead Counselor · Stanford EdD", years: "15 yrs" },
  { name: "James Okonkwo", role: "Interview Coach · Princeton '05", years: "12 yrs" },
];

const values = [
  { t: "Honesty over hype", d: "We tell families what they need to hear, not what they want to hear." },
  { t: "Long-term relationships", d: "98% sibling return rate is our proudest metric." },
  { t: "Senior-only consultants", d: "Your child works with seasoned strategists. Never juniors." },
  { t: "Outcomes, not optics", d: "We measure ourselves by acceptance letters, not testimonials." },
];

function AboutPage() {
  return (
    <>
      <Section className="pt-16 lg:pt-20">
        <FadeIn>
          <Eyebrow>About 4Schoolers</Eyebrow>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-bold text-primary text-balance lg:text-6xl">
            150 years of Ivy League expertise, in one team.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            We're former admissions officers, Ivy alumni, and seasoned strategists who've spent careers
            inside the world's most selective institutions. Now we use that experience to help ambitious
            families navigate it.
          </p>
        </FadeIn>
      </Section>

      <Section className="bg-secondary/40 border-y border-border">
        <div className="grid gap-12 lg:grid-cols-2">
          <FadeIn>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-bold text-primary lg:text-4xl">
              Founded by an admissions officer who saw a gap.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-5 text-foreground/85 leading-relaxed">
              <p>
                After 22 years reading applications at Yale, our founder Dr. Eleanor Whitfield noticed a
                pattern: brilliant students were being overlooked because no one had taught them how to
                tell their story.
              </p>
              <p>
                She started 4Schoolers in 2009 with a simple thesis — pair every family with a senior
                strategist who's actually sat on the other side of the table. Fifteen years later, we've
                placed students at every Ivy and top-25 university in the country.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section>
        <FadeIn>
          <Eyebrow>The team</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-bold text-primary lg:text-4xl">
            Senior consultants. No exceptions.
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <FadeIn key={m.name} delay={i * 0.08}>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="aspect-square w-full rounded-lg bg-gradient-to-br from-primary/10 to-[var(--gold)]/20" />
                <p className="mt-5 font-serif text-lg font-semibold text-primary">{m.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[var(--gold-foreground)]/70">{m.years} experience</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <FadeIn>
          <Eyebrow>What we believe</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-bold text-primary lg:text-4xl">Our values.</h2>
        </FadeIn>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <FadeIn key={v.t} delay={i * 0.06}>
              <div className="border-l-2 border-[var(--gold)] pl-6">
                <h3 className="font-serif text-xl font-semibold text-primary">{v.t}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{v.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="text-center border-t border-border">
        <FadeIn>
          <h2 className="font-serif text-4xl font-bold text-primary text-balance lg:text-5xl">
            Meet the team. See if we're a fit.
          </h2>
          <Button asChild size="lg" className="mt-8 h-12 bg-[var(--gold)] px-7 text-base text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90">
            <Link to="/contact">Book a Free Strategy Session</Link>
          </Button>
        </FadeIn>
      </Section>
    </>
  );
}
