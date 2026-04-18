import { Link } from "@tanstack/react-router";
import { Section, FadeIn } from "./section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass } from "lucide-react";

export function QuizCTA() {
  return (
    <Section ariaLabel="Take the quiz">
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground lg:p-16">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--gold)]/15 blur-3xl" />
          <div className="absolute -bottom-32 -left-12 h-72 w-72 rounded-full bg-[var(--gold)]/10 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--gold)]">
                <Compass className="h-3.5 w-3.5" /> 2-minute quiz
              </span>
              <h2 className="mt-5 max-w-2xl font-serif text-4xl font-bold leading-tight text-balance sm:text-5xl">
                Find your admission path.
              </h2>
              <p className="mt-4 max-w-xl text-primary-foreground/75 text-lg">
                Answer four quick questions and we'll send you a personalized roadmap based on your grade,
                target schools, and biggest challenge.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="h-12 bg-[var(--gold)] px-7 text-base font-semibold text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90"
            >
              <Link to="/quiz">
                Start the quiz <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
