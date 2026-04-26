import { Section, FadeIn, Eyebrow } from "./section";

const flags = [
  "🇰🇿", "🇰🇷", "🇯🇵", "🇨🇳", "🇩🇪", "🇨🇭", "🇬🇧", "🇨🇦",
  "🇮🇳", "🇵🇰", "🇺🇦", "🇧🇾", "🇩🇰", "🇲🇽", "🇨🇴", "🇧🇷",
  "🇮🇱", "🇰🇼", "🇺🇿", "🇵🇭", "🇦🇹", "🇦🇿", "🇷🇺", "🇱🇦",
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
            {[...flags, ...flags].map((flag, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="text-[40px] leading-none select-none"
              >
                {flag}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-8 max-w-xl text-lg text-muted-foreground">
          24+ countries. One mission: your child's success.
        </p>
      </FadeIn>
    </Section>
  );
}
