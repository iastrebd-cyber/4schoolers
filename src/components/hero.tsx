import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

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

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 lg:px-10 lg:pt-28 lg:pb-36">
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
          className="mt-6 max-w-4xl font-serif text-5xl font-bold leading-[1.05] tracking-tight text-primary text-balance sm:text-6xl lg:text-7xl"
        >
          97% Success Rate in{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Elite College Admissions</span>
            <span className="absolute inset-x-0 bottom-1 h-3 bg-[var(--gold)]/35 -z-0" />
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
        >
          <span className="font-semibold uppercase tracking-wider text-foreground/60 text-xs">
            Placements:
          </span>
          {["Harvard", "Yale", "Princeton", "Columbia", "Stanford", "MIT"].map((u) => (
            <span key={u} className="font-serif text-base text-primary/80">
              {u}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
