import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, FadeIn, Eyebrow } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Check, Trophy } from "lucide-react";

export const Route = createFileRoute("/services/athletic-recruitment")({
  head: () => ({
    meta: [
      { title: "Athletic Recruitment — D1, D2, D3 Placement | 4Schoolers" },
      {
        name: "description",
        content:
          "College and prep school placement for student-athletes pursuing Division I, II, and III programs. Coach outreach, school visits, accelerated academic prep.",
      },
      { property: "og:title", content: "Athletic Recruitment — 4Schoolers" },
      {
        property: "og:description",
        content: "Placement support for student-athletes across all sports and divisions.",
      },
    ],
  }),
  component: AthleticRecruitmentPage,
});

const bullets = [
  "Define the student's athletic and academic goals",
  "Identify institutions actively recruiting in their sport",
  "Research best-fit schools academically and athletically",
  "Arrange school visits and liaise directly with coaching staff",
  "Offer accelerated academic prep for athletes with limited time",
  "Schedule flexible sessions at sports complexes or online",
];

function AthleticRecruitmentPage() {
  return (
    <>
      <Section className="pt-16 lg:pt-20">
        <FadeIn>
          <Eyebrow>Specialized service</Eyebrow>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-bold text-primary text-balance lg:text-6xl">
            College & Prep School Placement for Student-Athletes
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            We work with student-athletes pursuing Division I, II, and III programs across all sports — and we meet you where you train.
          </p>
        </FadeIn>
      </Section>

      <Section className="border-t border-border bg-secondary/40">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <FadeIn>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Trophy className="h-6 w-6" />
            </div>
            <h2 className="mt-6 font-serif text-3xl font-bold text-primary lg:text-4xl">
              Our process
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
            Ready to get recruited?
          </h2>
          <Button asChild size="lg" className="mt-8 h-12 bg-[var(--gold)] px-7 text-base text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90">
            <Link to="/contact">Book a Free Consultation</Link>
          </Button>
        </FadeIn>
      </Section>
    </>
  );
}
