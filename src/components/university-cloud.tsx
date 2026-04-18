import { Section, FadeIn } from "./section";

const schools = [
  "Harvard", "Yale", "Princeton", "Columbia",
  "Brown", "Cornell", "Dartmouth", "UPenn",
  "Stanford", "MIT", "Duke", "Northwestern",
];

export function UniversityCloud() {
  return (
    <Section ariaLabel="University placements" className="border-t border-border py-16">
      <FadeIn>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Where our students get in
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {schools.map((s) => (
            <li
              key={s}
              className="flex items-center justify-center font-serif text-xl font-semibold text-muted-foreground/60 transition-all hover:text-primary"
            >
              {s}
            </li>
          ))}
        </ul>
      </FadeIn>
    </Section>
  );
}
