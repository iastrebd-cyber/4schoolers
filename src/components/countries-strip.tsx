import { Section, FadeIn, Eyebrow } from "./section";

const countries = [
  { flag: "🇰🇿", name: "Kazakhstan" },
  { flag: "🇰🇷", name: "South Korea" },
  { flag: "🇯🇵", name: "Japan" },
  { flag: "🇨🇳", name: "China" },
  { flag: "🇩🇪", name: "Germany" },
  { flag: "🇨🇭", name: "Switzerland" },
  { flag: "🇬🇧", name: "United Kingdom" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇮🇳", name: "India" },
  { flag: "🇵🇰", name: "Pakistan" },
  { flag: "🇺🇦", name: "Ukraine" },
  { flag: "🇧🇾", name: "Belarus" },
  { flag: "🇩🇰", name: "Denmark" },
  { flag: "🇲🇽", name: "Mexico" },
  { flag: "🇨🇴", name: "Colombia" },
  { flag: "🇧🇷", name: "Brazil" },
  { flag: "🇮🇱", name: "Israel" },
  { flag: "🇰🇼", name: "Kuwait" },
  { flag: "🇺🇿", name: "Uzbekistan" },
  { flag: "🇵🇭", name: "Philippines" },
  { flag: "🇦🇹", name: "Austria" },
  { flag: "🇦🇿", name: "Azerbaijan" },
  { flag: "🇷🇺", name: "Russia" },
  { flag: "🇱🇦", name: "Laos" },
];

export function CountriesStrip() {
  return (
    <Section ariaLabel="Countries" className="border-t border-border">
      <FadeIn>
        <Eyebrow>Global community</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl font-bold text-primary text-balance sm:text-5xl">
          Our students come from around the world.
        </h2>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
          24+ countries. One mission: your child's success.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <ul className="mt-12 flex flex-wrap gap-2.5">
          {countries.map((c) => (
            <li
              key={c.name}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-2 text-sm font-medium text-foreground/85 transition-colors hover:border-[var(--gold)]/60 hover:bg-card"
            >
              <span aria-hidden="true" className="text-base leading-none">{c.flag}</span>
              <span>{c.name}</span>
            </li>
          ))}
        </ul>
      </FadeIn>
    </Section>
  );
}
