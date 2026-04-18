import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, FadeIn, Eyebrow } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Compass, MessageSquare, Briefcase, BookOpen, Check } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — College Admissions Consulting Boston | 4Schoolers" },
      {
        name: "description",
        content:
          "Ivy League admissions counseling, interview coaching, internship placements, and academic enrichment for middle and high school students.",
      },
      { property: "og:title", content: "Services — 4Schoolers" },
      {
        property: "og:description",
        content: "Comprehensive college admissions services from former admissions officers and Ivy League alumni.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Compass,
    h2: "College Admissions Consulting Boston",
    title: "Admissions Counseling",
    intro:
      "Personalized 1-on-1 strategy from middle school through senior year. We help your child build the kind of profile elite admissions officers actually notice.",
    bullets: [
      "School list curation aligned to fit, ambition, and outcomes",
      "Course selection and academic trajectory planning",
      "Activity strategy: leadership, depth, signature commitments",
      "Common App and supplemental essay coaching",
      "Final review and submission strategy",
    ],
  },
  {
    icon: MessageSquare,
    h2: "Ivy League Interview Coaching",
    title: "Interview Preparation",
    intro:
      "Mock interviews led by former admissions officers from Harvard, Yale, and Stanford. Walk in confident, leave memorable.",
    bullets: [
      "Multiple recorded mock sessions with detailed feedback",
      "School-specific interview question banks",
      "Story development and message clarity",
      "Body language, pacing, and presence coaching",
      "Same-day debrief after real interviews",
    ],
  },
  {
    icon: Briefcase,
    h2: "Exclusive Internship & Research Placements",
    title: "Internship Connections",
    intro:
      "We connect students with research labs, startups, and Fortune 500 mentorships through our private network — opportunities you won't find on any job board.",
    bullets: [
      "MIT, Harvard, and Stanford research lab placements",
      "Tech and finance shadowing programs",
      "Nonprofit leadership opportunities",
      "Application support and interview prep for each role",
      "Resume and LinkedIn polish",
    ],
  },
  {
    icon: BookOpen,
    h2: "Academic Enrichment & Competition Coaching",
    title: "Academic Enrichment",
    intro:
      "Rigorous coursework, olympiad coaching, and SAT/ACT prep designed for students who want to perform in the top 1%.",
    bullets: [
      "SAT, ACT, AP, and subject test preparation",
      "Math, Science, and Linguistics olympiad coaching",
      "Writing intensives and research mentorship",
      "Summer program advising (RSI, TASP, COSMOS)",
      "Custom enrichment for grades 6–12",
    ],
  },
];

function ServicesPage() {
  return (
    <>
      <Section className="pt-16 lg:pt-20">
        <FadeIn>
          <Eyebrow>Services</Eyebrow>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-bold text-primary text-balance lg:text-6xl">
            Built for the world's most selective universities.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Every service is led by senior consultants with deep Ivy League expertise. No junior staff, no cookie-cutter advice.
          </p>
        </FadeIn>
      </Section>

      <div className="border-t border-border">
        {services.map((s, i) => (
          <Section
            key={s.title}
            className={i % 2 === 0 ? "" : "bg-secondary/40"}
          >
            <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
              <FadeIn>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <s.icon className="h-6 w-6" />
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold-foreground)]/70">
                  0{i + 1}
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-primary lg:text-4xl">
                  {s.h2}
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="font-serif text-2xl leading-snug text-primary/85">{s.intro}</p>
                <ul className="mt-8 space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-foreground/85">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--gold)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </Section>
        ))}
      </div>

      <Section className="border-t border-border text-center">
        <FadeIn>
          <h2 className="font-serif text-4xl font-bold text-primary text-balance lg:text-5xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground text-lg">
            Take our 2-minute quiz and we'll recommend the right path for your child.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 bg-[var(--gold)] px-7 text-base text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90">
              <Link to="/quiz">Take the Quiz</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-primary px-7 text-base text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/contact">Book a Strategy Session</Link>
            </Button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
