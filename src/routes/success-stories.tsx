import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, FadeIn, Eyebrow } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";
import awardsPhoto from "@/assets/articles/why-apply-to-columbia/cover.jpg";

export const Route = createFileRoute("/success-stories")({
  head: () => ({
    meta: [
      { title: "Success Stories — Ivy League Acceptances | 4Schoolers" },
      {
        name: "description",
        content:
          "Real students, real acceptances. Read how 4Schoolers families landed at Harvard, Yale, Princeton, MIT, and more.",
      },
      { property: "og:title", content: "Success Stories — 4Schoolers" },
      { property: "og:description", content: "Hundreds of students placed at Ivy League and top-tier universities." },
    ],
  }),
  component: SuccessPage,
});

const stories = [
  {
    name: "Aanya P.",
    school: "Harvard '28",
    quote: "Started in 9th grade thinking I'd be lucky to get into a top-30. Four years later, I'm at Harvard studying neuroscience. The strategy made the difference.",
    tag: "Started: Grade 9",
  },
  {
    name: "Daniel K.",
    school: "Princeton '27",
    quote: "My consultant pushed me to start a research project that became the centerpiece of my application. I never would have done that on my own.",
    tag: "Started: Grade 10",
  },
  {
    name: "Sarah L.",
    school: "Harvard '26",
    quote: "Their interview prep was unmatched. I walked into my Harvard interview feeling like I had been doing this for years.",
    tag: "Started: Grade 11",
  },
  {
    name: "Mateo R.",
    school: "Stanford '28",
    quote: "Coming from a small public school, I had no idea how to navigate this. 4Schoolers gave me a roadmap from sophomore year on.",
    tag: "Started: Grade 10",
  },
  {
    name: "Yuki T.",
    school: "MIT '27",
    quote: "The internship they connected me with at an MIT lab became the topic of my Common App essay. Everything clicked.",
    tag: "Started: Grade 11",
  },
  {
    name: "Olivia W.",
    school: "Yale '28",
    quote: "I was rejected from my dream school's summer program in junior year. They helped me reframe it into the most powerful essay of my application.",
    tag: "Started: Grade 9",
  },
];

const stats = [
  { n: "400+", l: "Students placed" },
  { n: "97%", l: "Top-3 acceptance rate" },
  { n: "1 in 3", l: "Admitted to an Ivy" },
  { n: "$8.4M", l: "Merit aid earned (2024)" },
];

function SuccessPage() {
  return (
    <>
      <Section className="pt-16 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <Eyebrow>Success Stories</Eyebrow>
            <h1 className="mt-4 font-serif text-5xl font-bold text-primary text-balance lg:text-6xl">
              Real students. Real acceptances.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              A small selection of the families we've worked with over the past 15 years.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-[var(--gold)]/15" />
              <div className="overflow-hidden rounded-2xl border border-border shadow-xl shadow-primary/10">
                <img
                  src={awardsPhoto}
                  alt="Excellence awards earned by 4Schoolers students"
                  width={799}
                  height={533}
                  className="aspect-[3/2] w-full object-cover"
                />
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <FadeIn key={s.l} delay={i * 0.08}>
              <div className="border-t-2 border-[var(--gold)] pt-5">
                <p className="font-serif text-4xl font-bold text-primary lg:text-5xl">{s.n}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.l}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-6 lg:grid-cols-2">
          {stories.map((s, i) => (
            <FadeIn key={s.name} delay={(i % 2) * 0.1}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 lg:p-10">
                <Quote className="h-8 w-8 text-[var(--gold)]" />
                <blockquote className="mt-6 flex-1 font-serif text-xl leading-snug text-primary/90 lg:text-2xl">
                  "{s.quote}"
                </blockquote>
                <footer className="mt-8 flex items-center justify-between border-t border-border pt-5">
                  <div>
                    <p className="font-semibold text-foreground">{s.name}</p>
                    <p className="text-sm text-[var(--gold-foreground)]/75">{s.school}</p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {s.tag}
                  </span>
                </footer>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="text-center border-t border-border">
        <FadeIn>
          <h2 className="font-serif text-4xl font-bold text-primary text-balance lg:text-5xl">
            Your story could be next.
          </h2>
          <Button asChild size="lg" className="mt-8 h-12 bg-[var(--gold)] px-7 text-base text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90">
            <Link to="/contact">Start with a Strategy Session</Link>
          </Button>
        </FadeIn>
      </Section>
    </>
  );
}
