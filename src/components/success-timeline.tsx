import { Section, FadeIn, Eyebrow } from "./section";
import { motion } from "framer-motion";

const milestones = [
  { grade: "Grades 6–8", title: "Foundation", desc: "Academic habits, exploration of passions, early enrichment." },
  { grade: "Grades 9–10", title: "Profile Building", desc: "Course strategy, leadership roles, signature activities." },
  { grade: "Grade 11", title: "Strategy & Testing", desc: "School list, SAT/ACT prep, summer programs, internships." },
  { grade: "Grade 12", title: "Applications", desc: "Essays, interviews, supplements, decisions." },
  { grade: "Acceptance", title: "Ivy & Top-Tier", desc: "Admit letters from the world's most selective schools." },
];

export function SuccessTimeline() {
  return (
    <Section ariaLabel="Student success timeline" className="bg-secondary/40 border-y border-border" >
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <Eyebrow>The journey</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl font-bold text-primary text-balance sm:text-5xl">
            From middle school curiosity to Ivy League acceptance.
          </h2>
        </FadeIn>

        {/* Desktop horizontal */}
        <div className="mt-16 hidden lg:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-5 h-px bg-border" />
            <div className="relative grid grid-cols-5 gap-6">
              {milestones.map((m, i) => (
                <FadeIn key={m.title} delay={i * 0.1}>
                  <div className="flex flex-col items-start">
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 200 }}
                      className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--gold)] bg-background font-serif text-sm font-bold text-primary"
                    >
                      {i + 1}
                    </motion.span>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[var(--gold-foreground)]/70">
                      {m.grade}
                    </p>
                    <h3 className="mt-1 font-serif text-lg font-semibold text-primary">{m.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical */}
        <ol className="relative mt-12 space-y-8 border-l border-border pl-6 lg:hidden">
          {milestones.map((m, i) => (
            <FadeIn key={m.title} delay={i * 0.05}>
              <li className="relative">
                <span className="absolute -left-[33px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[var(--gold)] bg-background text-[10px] font-bold text-primary">
                  {i + 1}
                </span>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{m.grade}</p>
                <h3 className="mt-1 font-serif text-lg font-semibold text-primary">{m.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </Section>
  );
}
