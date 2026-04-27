import { Section, FadeIn } from "./section";
import harvardIcon from "@/assets/universities/harvard.png";
import yaleIcon from "@/assets/universities/yale.png";
import princetonIcon from "@/assets/universities/princeton.png";
import columbiaIcon from "@/assets/universities/columbia.png";
import brownIcon from "@/assets/universities/brown.png";
import cornellIcon from "@/assets/universities/cornell.png";
import dartmouthIcon from "@/assets/universities/dartmouth.png";
import upennIcon from "@/assets/universities/upenn.png";
import stanfordIcon from "@/assets/universities/stanford.png";
import mitIcon from "@/assets/universities/mit.png";
import dukeIcon from "@/assets/universities/duke.png";
import northwesternIcon from "@/assets/universities/northwestern.png";

const schools = [
  { name: "Harvard", icon: harvardIcon },
  { name: "Yale", icon: yaleIcon },
  { name: "Princeton", icon: princetonIcon },
  { name: "Columbia", icon: columbiaIcon },
  { name: "Brown", icon: brownIcon },
  { name: "Cornell", icon: cornellIcon },
  { name: "Dartmouth", icon: dartmouthIcon },
  { name: "UPenn", icon: upennIcon },
  { name: "Stanford", icon: stanfordIcon },
  { name: "MIT", icon: mitIcon },
  { name: "Duke", icon: dukeIcon },
  { name: "Northwestern", icon: northwesternIcon },
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
        <div
          className="mt-10 relative w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)",
          }}
          role="marquee"
          aria-label="Top university placements"
        >
          <div className="flex w-max gap-12 animate-flag-marquee">
            {[...schools, ...schools].map((s, i) => (
              <div
                key={`${s.name}-${i}`}
                className="flex shrink-0 items-center gap-3 font-serif text-lg font-semibold text-muted-foreground/80 transition-colors hover:text-primary"
              >
                <img
                  src={s.icon}
                  alt={`${s.name} emblem`}
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="h-14 w-14 shrink-0 select-none object-contain"
                />
                <span className="whitespace-nowrap">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
