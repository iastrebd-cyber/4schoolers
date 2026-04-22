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
        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {schools.map((s) => (
            <li
              key={s.name}
              className="flex flex-col items-center justify-center gap-2 text-center font-serif text-base font-semibold text-muted-foreground/70 transition-all hover:text-primary"
            >
              <img
                src={s.icon}
                alt={`${s.name} emblem`}
                width={56}
                height={56}
                loading="lazy"
                className="h-14 w-14 object-contain"
              />
              <span>{s.name}</span>
            </li>
          ))}
        </ul>
      </FadeIn>
    </Section>
  );
}
