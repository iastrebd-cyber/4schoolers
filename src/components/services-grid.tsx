import { Link } from "@tanstack/react-router";
import { Section, FadeIn, Eyebrow } from "./section";
import { Compass, MessageSquare, Briefcase, BookOpen, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Compass,
    title: "Admissions Counseling",
    desc: "Personalized strategy for middle & high schoolers — from school selection to final application submission.",
  },
  {
    icon: MessageSquare,
    title: "Interview Preparation",
    desc: "Mock interviews with former admissions officers. Refine your story and project genuine confidence.",
  },
  {
    icon: Briefcase,
    title: "Internship Connections",
    desc: "Exclusive placements at research labs, startups, and Fortune 500 firms across our alumni network.",
  },
  {
    icon: BookOpen,
    title: "Academic Enrichment",
    desc: "Competitive courses, olympiad coaching, and rigorous tutoring for students who aim higher.",
  },
];

export function ServicesGrid() {
  return (
    <Section ariaLabel="Our services" className="border-t border-border">
      <FadeIn>
        <Eyebrow>What we do</Eyebrow>
        <div className="mt-4 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="max-w-2xl font-serif text-4xl font-bold text-primary text-balance sm:text-5xl">
            Strategy at every milestone of the journey.
          </h2>
          <Link
            to="/services"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            Explore all services
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </FadeIn>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <FadeIn key={s.title} delay={i * 0.08}>
            <Link
              to="/services"
              className="group flex h-full flex-col rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-[var(--gold)]/50 hover:shadow-[0_18px_40px_-20px_oklch(0.24_0.07_265_/_0.25)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary group-hover:bg-[var(--gold)] group-hover:text-[var(--gold-foreground)] transition-colors">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold text-primary">
                <span className="gold-underline">{s.title}</span>
              </h3>
              <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Learn more <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
