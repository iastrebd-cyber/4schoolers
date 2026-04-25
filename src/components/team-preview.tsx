import { Link } from "@tanstack/react-router";
import { Section, FadeIn, Eyebrow } from "./section";
import { ArrowUpRight } from "lucide-react";

const featured = [
  {
    name: "Irina Jitomirskaia, Ph.D., M.Ed.",
    title: "CEO & Co-Founder",
    blurb: "Founded 4Schoolers in 2015. Personally oversees every student's journey.",
    initials: "IJ",
  },
  {
    name: "Olga Katkova, Ph.D.",
    title: "Director of Mathematics · UMass Boston Professor",
    blurb: "Leads all math enrichment, competition prep, and advanced coursework.",
    initials: "OK",
  },
  {
    name: "Elena Aristarkhova, Ph.D.",
    title: "Harvard Medical School Faculty",
    blurb: "20+ years preparing students for SAT, ACT, AP, and MCAT.",
    initials: "EA",
  },
];

export function TeamPreview() {
  return (
    <Section ariaLabel="Meet our experts" className="border-t border-border">
      <FadeIn>
        <Eyebrow>Meet our experts</Eyebrow>
        <div className="mt-4 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="max-w-2xl font-serif text-4xl font-bold text-primary text-balance sm:text-5xl">
            Taught by professors, not by tutors.
          </h2>
          <Link
            to="/team"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            Meet the full team
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </FadeIn>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((m, i) => (
          <FadeIn key={m.name} delay={i * 0.08}>
            <Link
              to="/team"
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-[var(--gold)]/50 hover:shadow-[0_18px_40px_-20px_oklch(0.24_0.07_265_/_0.25)]"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[var(--gold)] font-serif text-xl font-bold text-primary-foreground">
                {m.initials}
              </div>
              <h3 className="mt-6 font-serif text-lg font-semibold text-primary">{m.name}</h3>
              <p className="mt-1 text-sm font-semibold text-[var(--gold-foreground)]/80">{m.title}</p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{m.blurb}</p>
            </Link>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
