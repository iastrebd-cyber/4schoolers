import { Section, FadeIn, Eyebrow } from "./section";

const programs = [
  {
    icon: "🏆",
    title: "Math Olympiad & Competition Camp",
    body:
      "Intensive preparation for national and international math competitions. Coached by Olympiad medalists including silver medalists from the Balkan and Kazakhstan National Olympiads. Students from Kazakhstan have traveled to Boston specifically for this program.",
  },
  {
    icon: "☀️",
    title: "Summer Masterclasses — Cape Cod & North Shore",
    body:
      "Immersive academic programs held each summer on Cape Cod and Boston's North Shore. Subjects include English language immersion, writing, and advanced academics. Limited enrollment. June–July.",
  },
  {
    icon: "♟️",
    title: "Chess, Art & Robotics for K–8",
    body:
      "Expert-led enrichment for younger students. Chess strategy, visual arts, and robotics available in small group and private settings. A beloved program for students as young as 6.",
  },
];

export function SpecialtyPrograms() {
  return (
    <Section ariaLabel="Specialty programs" className="border-t border-border bg-secondary/40">
      <FadeIn>
        <Eyebrow>Beyond the classroom</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl font-bold text-primary text-balance sm:text-5xl">
          Programs that set our students apart.
        </h2>
      </FadeIn>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {programs.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.08}>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-[var(--gold)]/50 hover:shadow-[0_18px_40px_-20px_oklch(0.24_0.07_265_/_0.25)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-3xl">
                <span aria-hidden="true">{p.icon}</span>
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold text-primary">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
