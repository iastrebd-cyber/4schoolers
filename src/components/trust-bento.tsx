import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Section, FadeIn, Eyebrow } from "./section";
import { Users, Award, TrendingUp } from "lucide-react";

function CountUp({ to, suffix = "", duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {val}
      {suffix && (
        <span className="font-sans align-baseline text-[0.62em] font-bold">{suffix}</span>
      )}
    </span>
  );
}

export function TrustBento() {
  return (
    <Section ariaLabel="Trust indicators">
      <FadeIn>
        <Eyebrow>Why families trust us</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl font-bold text-primary text-balance sm:text-5xl">
          Outcomes that speak louder than promises.
        </h2>
      </FadeIn>

      <div className="mt-14 grid gap-4 lg:grid-cols-6 lg:grid-rows-2">
        <FadeIn className="lg:col-span-3 lg:row-span-2">
          <div className="flex h-full flex-col justify-between rounded-2xl bg-primary p-10 text-primary-foreground lg:p-12">
            <Users className="h-8 w-8 text-[var(--gold)]" />
            <div className="mt-10">
              <p className="font-serif text-7xl font-bold leading-none text-[var(--gold)] lg:text-8xl">
                <CountUp to={98} suffix="%" />
              </p>
              <h3 className="mt-6 font-serif text-2xl font-semibold">Sibling Return Rate</h3>
              <p className="mt-3 max-w-md text-primary-foreground/75 leading-relaxed">
                When one child works with us, families come back. The clearest signal of long-term trust we have.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="lg:col-span-3">
          <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 lg:p-10">
            <Award className="h-7 w-7 text-[var(--gold)]" />
            <p className="mt-6 font-serif text-5xl font-bold text-primary lg:text-6xl">
              <CountUp to={150} suffix="+" />
            </p>
            <h3 className="mt-3 font-serif text-xl font-semibold text-primary">Years of Combined Experience</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Former admissions officers, Ivy League alumni, and seasoned strategists.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="lg:col-span-3">
          <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 lg:p-10">
            <TrendingUp className="h-7 w-7 text-[var(--gold)]" />
            <p className="mt-6 font-serif text-5xl font-bold text-primary lg:text-6xl">
              <CountUp to={6} suffix="×" />
            </p>
            <h3 className="mt-3 font-serif text-xl font-semibold text-primary">Higher Acceptance Rates</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Our students gain admission to top-25 universities at six times the national average.
            </p>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
