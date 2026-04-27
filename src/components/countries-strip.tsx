import { Link } from "@tanstack/react-router";
import { Section, FadeIn, Eyebrow } from "./section";

const countries: { code: string; name: string }[] = [
  { code: "kz", name: "Kazakhstan" },
  { code: "kr", name: "South Korea" },
  { code: "jp", name: "Japan" },
  { code: "cn", name: "China" },
  { code: "de", name: "Germany" },
  { code: "ch", name: "Switzerland" },
  { code: "gb", name: "United Kingdom" },
  { code: "ca", name: "Canada" },
  { code: "in", name: "India" },
  { code: "pk", name: "Pakistan" },
  { code: "ua", name: "Ukraine" },
  { code: "by", name: "Belarus" },
  { code: "dk", name: "Denmark" },
  { code: "mx", name: "Mexico" },
  { code: "co", name: "Colombia" },
  { code: "br", name: "Brazil" },
  { code: "il", name: "Israel" },
  { code: "kw", name: "Kuwait" },
  { code: "uz", name: "Uzbekistan" },
  { code: "ph", name: "Philippines" },
  { code: "at", name: "Austria" },
  { code: "az", name: "Azerbaijan" },
  { code: "ru", name: "Russia" },
  { code: "la", name: "Laos" },
];

export function CountriesStrip() {
  return (
    <Section ariaLabel="Countries" className="border-t border-border">
      <FadeIn>
        <Eyebrow>Global community</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl font-bold text-primary text-balance sm:text-5xl">
          Our students come from around the world.
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div
          className="mt-12 relative w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)",
          }}
          role="marquee"
          aria-label="Countries we serve"
        >
          <div className="flex w-max gap-8 animate-flag-marquee">
            {[...countries, ...countries].map((c, i) => {
              const flag = (
                <img
                  src={`https://flagcdn.com/w160/${c.code}.png`}
                  srcSet={`https://flagcdn.com/w160/${c.code}.png 1x, https://flagcdn.com/w320/${c.code}.png 2x`}
                  width={60}
                  height={40}
                  alt={c.name}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="h-10 w-[60px] shrink-0 select-none object-cover transition-transform duration-300 group-hover:scale-110"
                />
              );
              if (c.code === "kz") {
                return (
                  <Link
                    key={`${c.code}-${i}`}
                    to="/resources/$slug"
                    params={{ slug: "kazakhstan-camp" }}
                    aria-label="Read about our Kazakhstan cohort at the Competition Camp"
                    title="See our Kazakhstan cohort"
                    className="group relative shrink-0 rounded outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                  >
                    {flag}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-1 rounded border border-[var(--gold)]/0 transition-colors duration-300 group-hover:border-[var(--gold)]/70"
                    />
                  </Link>
                );
              }
              return (
                <span key={`${c.code}-${i}`} className="group shrink-0">
                  {flag}
                </span>
              );
            })}
          </div>
        </div>

        <p className="mt-8 max-w-xl text-lg text-muted-foreground">
          24+ countries. One mission: your child's success.
        </p>
      </FadeIn>
    </Section>
  );
}
