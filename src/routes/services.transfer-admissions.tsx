import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, FadeIn, Eyebrow } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Check, ArrowRightLeft } from "lucide-react";

export const Route = createFileRoute("/services/transfer-admissions")({
  head: () => ({
    meta: [
      { title: "Transfer Admissions — University Transfer Support | 4Schoolers" },
      {
        name: "description",
        content:
          "Transfer admissions guidance for current college students. Target school selection, transfer essays, and credit strategy.",
      },
      { property: "og:title", content: "Transfer Admissions — 4Schoolers" },
      {
        property: "og:description",
        content: "Already in college but aiming higher? We guide students through the transfer process.",
      },
    ],
  }),
  component: TransferAdmissionsPage,
});

const bullets = [
  "Target school selection based on transfer acceptance rates",
  "Transfer essay strategy that explains your story compellingly",
  "Credit transfer and academic planning",
  "Recommendation strategy from current professors",
  "Application timeline and deadline management",
];

function TransferAdmissionsPage() {
  return (
    <>
      <Section className="pt-16 lg:pt-20">
        <FadeIn>
          <Eyebrow>Specialized service</Eyebrow>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-bold text-primary text-balance lg:text-6xl">
            University Transfer Admissions Support
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Already in college but aiming higher? We guide students through the transfer process — from selecting target schools to crafting a transfer essay that explains your story compellingly.
          </p>
        </FadeIn>
      </Section>

      <Section className="border-t border-border bg-secondary/40">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <FadeIn>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ArrowRightLeft className="h-6 w-6" />
            </div>
            <h2 className="mt-6 font-serif text-3xl font-bold text-primary lg:text-4xl">
              How we guide your transfer
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
            Time for the right school.
          </h2>
          <Button asChild size="lg" className="mt-8 h-12 bg-[var(--gold)] px-7 text-base text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90">
            <Link to="/contact">Book a Free Consultation</Link>
          </Button>
        </FadeIn>
      </Section>
    </>
  );
}
