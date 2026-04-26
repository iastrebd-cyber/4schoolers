import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, FadeIn, Eyebrow } from "@/components/section";
import { SoftBlogFooterNote } from "@/components/soft-blog-footer-note";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — College Admissions Guides | 4Schoolers" },
      {
        name: "description",
        content:
          "Free guides, essay frameworks, and admissions insights from senior 4Schoolers consultants.",
      },
      { property: "og:title", content: "Resources — 4Schoolers" },
      { property: "og:description", content: "Free admissions guides, essay tips, and strategy frameworks." },
    ],
  }),
  component: ResourcesPage,
});

const articles = [
  { tag: "Essays", title: "The 5-paragraph trap: why most college essays sound the same", time: "8 min read" },
  { tag: "Strategy", title: "How to build a school list that actually fits", time: "12 min read" },
  { tag: "Activities", title: "Depth over breadth: what admissions officers really look for", time: "6 min read" },
  { tag: "Testing", title: "Test-optional in 2025: should your child still take the SAT?", time: "10 min read" },
  { tag: "Interviews", title: "The 3 questions every Ivy interviewer asks (and how to answer)", time: "7 min read" },
  { tag: "Parents", title: "What every parent of a high schooler should know", time: "15 min read" },
];

function ResourcesPage() {
  return (
    <>
      <Section className="pt-16 lg:pt-20">
        <FadeIn>
          <Eyebrow>Resources</Eyebrow>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-bold text-primary text-balance lg:text-6xl">
            Insights from inside the admissions office.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Free guides written by our senior consultants — many of whom spent years reading applications.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <FadeIn key={a.title} delay={i * 0.06}>
              <Link
                to="/resources"
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-[var(--gold)]/50"
              >
                <div className="aspect-[4/3] w-full rounded-lg bg-gradient-to-br from-primary/15 via-secondary to-[var(--gold)]/20" />
                <span className="mt-6 text-xs font-semibold uppercase tracking-wider text-[var(--gold-foreground)]/75">
                  {a.tag}
                </span>
                <h2 className="mt-2 flex-1 font-serif text-lg font-semibold text-primary leading-snug">
                  {a.title}
                </h2>
                <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
                  <span>{a.time}</span>
                  <ArrowUpRight className="h-4 w-4 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Section>
      <SoftBlogFooterNote />
    </>
  );
}
