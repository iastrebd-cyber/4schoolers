import { Section, FadeIn, Eyebrow } from "./section";
import olympiadPhoto from "@/assets/articles/kazakhstan-camp/cover.jpg";
import capeCodPhoto from "@/assets/articles/summer-camp-journal/cover.jpg";
import chessPhoto from "@/assets/articles/kazakhstan-camp/chess.jpg";

const programs = [
  {
    image: olympiadPhoto,
    alt: "4Schoolers competition camp cohort, including students who traveled from Kazakhstan",
    title: "Math Olympiad & Competition Camp",
    body:
      "Intensive preparation for national and international math competitions. Coached by Olympiad medalists including silver medalists from the Balkan and Kazakhstan National Olympiads. Students from Kazakhstan have traveled to Boston specifically for this program.",
  },
  {
    image: capeCodPhoto,
    alt: "Sunset over the water on Cape Cod, where summer masterclasses are held",
    title: "Summer Masterclasses — Cape Cod & North Shore",
    body:
      "Immersive academic programs held each summer on Cape Cod and Boston's North Shore. Subjects include English language immersion, writing, and advanced academics. Limited enrollment. June–July.",
  },
  {
    image: chessPhoto,
    alt: "Students playing chess during a 4Schoolers enrichment session",
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
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-[var(--gold)]/50 hover:shadow-[0_18px_40px_-20px_oklch(0.24_0.07_265_/_0.25)]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/45 via-primary/5 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-serif text-xl font-semibold text-primary">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
