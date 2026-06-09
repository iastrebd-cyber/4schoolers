import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroPhoto from "@/assets/articles/kazakhstan-camp/professor.jpg";
import harvardIcon from "@/assets/universities/harvard.png";
import yaleIcon from "@/assets/universities/yale.png";
import princetonIcon from "@/assets/universities/princeton.png";
import columbiaIcon from "@/assets/universities/columbia.png";
import stanfordIcon from "@/assets/universities/stanford.png";
import mitIcon from "@/assets/universities/mit.png";

const universities = [
  { name: "Harvard", icon: harvardIcon },
  { name: "Yale", icon: yaleIcon },
  { name: "Princeton", icon: princetonIcon },
  { name: "Columbia", icon: columbiaIcon },
  { name: "Stanford", icon: stanfordIcon },
  { name: "MIT", icon: mitIcon },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-background to-background" />
        <svg
          className="absolute -top-32 left-1/2 -z-10 -translate-x-1/2 opacity-[0.04]"
          width="1200"
          height="1200"
          viewBox="0 0 1200 1200"
          fill="none"
          aria-hidden
        >
          <circle cx="600" cy="600" r="599" stroke="currentColor" />
          <circle cx="600" cy="600" r="450" stroke="currentColor" />
          <circle cx="600" cy="600" r="300" stroke="currentColor" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-10 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Left column — message */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-1.5 text-xs font-medium text-[var(--gold-foreground)]"
            >
              <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" />
              Trusted by 400+ Ivy-bound families
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-6 font-serif text-5xl font-bold uppercase leading-[1.05] tracking-tight text-primary text-balance sm:text-6xl lg:text-6xl xl:text-[4rem]"
            >
              <span className="relative -top-[0.08em] inline-block text-[115%] leading-none text-[hsl(0_75%_45%)]">97</span><span className="text-[hsl(0_75%_45%)]">%</span> Success Rate in{" "}
              Elite College{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Admissions</span>
                <span className="absolute inset-x-0 bottom-1.5 -z-0 h-3 bg-[var(--gold)]/40" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              Navigating the path to Ivy League and top-tier universities with{" "}
              <span className="font-semibold text-foreground">150 years of combined expertise.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              <Button
                asChild
                size="lg"
                className="pulse-gold h-12 bg-[var(--gold)] px-7 text-base font-semibold text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90"
              >
                <Link to="/contact">
                  Book a Strategy Session
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 border-primary px-7 text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/quiz">Find Your Admission Path</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right column — photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-[var(--gold)]/15" />
            <div className="overflow-hidden rounded-2xl border border-border shadow-2xl shadow-primary/15">
              <img
                src={heroPhoto}
                alt="A 4Schoolers professor working through a problem with students"
                width={847}
                height={635}
                className="aspect-[4/3.1] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-border bg-card px-5 py-4 shadow-xl sm:block">
              <div className="font-serif text-3xl font-bold leading-none text-primary">98%</div>
              <div className="mt-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Sibling return rate
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Placements — full-width band */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="mt-16 border-t border-border"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 py-8 text-sm text-muted-foreground lg:flex-nowrap lg:justify-between lg:px-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
            Placements:
          </span>
          {universities.map((u) => (
            <span key={u.name} className="inline-flex items-center gap-2">
              <img
                src={u.icon}
                alt={`${u.name} emblem`}
                width={28}
                height={28}
                loading="lazy"
                className="h-7 w-7 object-contain"
              />
              <span className="font-serif text-base text-primary/80">{u.name}</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
