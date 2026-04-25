import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, FadeIn, Eyebrow } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Check, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/services/graduate-admissions")({
  head: () => ({
    meta: [
      { title: "Graduate Admissions — MBA, Law, PhD Support | 4Schoolers" },
      {
        name: "description",
        content:
          "Graduate and professional school admissions support: MBA, law, PhD. School lists, essays, interview prep, and deadline management.",
      },
      { property: "og:title", content: "Graduate Admissions — 4Schoolers" },
      {
        property: "og:description",
        content: "Compelling graduate applications for MBA, law, PhD, and professional programs.",
      },
    ],
  }),
  component: GraduateAdmissionsPage,
});

const bullets = [
  "School list strategy aligned to career goals",
  "Personal statement and essay editing",
  "Interview preparation with mock sessions",
  "Recommendation strategy and deadline management",
  "Test prep coordination (GRE, GMAT, LSAT)",
];

function GraduateAdmissionsPage() {
  return (
    <>
      <Section className="pt-16 lg:pt-20">
        <FadeIn>
          <Eyebrow>Specialized service</Eyebrow>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-bold text-primary text-balance lg:text-6xl">
            Graduate & Professional School Admissions
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            From MBA to law to PhD programs, we help students at every level build compelling applications. Support includes school list strategy, essay editing, interview prep, and deadline management.
          </p>
        </FadeIn>
      </Section>

      <Section className="border-t border-border bg-secondary/40">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <FadeIn>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h2 className="mt-6 font-serif text-3xl font-bold text-primary lg:text-4xl">
              How we help
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
            Ready for graduate school?
          </h2>
          <Button asChild size="lg" className="mt-8 h-12 bg-[var(--gold)] px-7 text-base text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90">
            <Link to="/contact">Book a Free Consultation</Link>
          </Button>
        </FadeIn>
      </Section>
    </>
  );
}
