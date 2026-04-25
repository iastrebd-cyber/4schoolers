import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, FadeIn, Eyebrow } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Check, Stethoscope } from "lucide-react";

export const Route = createFileRoute("/services/bs-md-programs")({
  head: () => ({
    meta: [
      { title: "BS/MD Programs — Direct Medical School Admissions | 4Schoolers" },
      {
        name: "description",
        content:
          "Long-term planning, research placements, and BS/MD interview prep for students pursuing direct medical program admission.",
      },
      { property: "og:title", content: "BS/MD Programs — 4Schoolers" },
      {
        property: "og:description",
        content: "Direct medical program admissions support, from middle school planning to interview day.",
      },
    ],
  }),
  component: BsMdPage,
});

const bullets = [
  "Long-term academic planning starting in middle school",
  "Extracurricular and passion project advising",
  "Medical research internship connections",
  "BS/MD-specific interview preparation",
  "Essay strategy with specialized advisors",
];

function BsMdPage() {
  return (
    <>
      <Section className="pt-16 lg:pt-20">
        <FadeIn>
          <Eyebrow>Specialized service</Eyebrow>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-bold text-primary text-balance lg:text-6xl">
            Direct Medical Program Admissions (BS/MD)
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            For students certain about a future in medicine, BS/MD programs offer a direct path to medical school — and are among the most selective in the US.
          </p>
        </FadeIn>
      </Section>

      <Section className="border-t border-border bg-secondary/40">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <FadeIn>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Stethoscope className="h-6 w-6" />
            </div>
            <h2 className="mt-6 font-serif text-3xl font-bold text-primary lg:text-4xl">
              What we provide
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ul className="space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex gap-3 text-foreground/85">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--gold)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Section>

      <Section className="border-t border-border text-center">
        <FadeIn>
          <h2 className="font-serif text-4xl font-bold text-primary text-balance lg:text-5xl">
            Plan the path to medicine.
          </h2>
          <Button asChild size="lg" className="mt-8 h-12 bg-[var(--gold)] px-7 text-base text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90">
            <Link to="/contact">Book a Free Consultation</Link>
          </Button>
        </FadeIn>
      </Section>
    </>
  );
}
