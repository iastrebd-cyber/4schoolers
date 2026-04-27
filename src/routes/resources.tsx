import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, FadeIn, Eyebrow } from "@/components/section";
import { ArrowRight } from "lucide-react";
import { articles } from "@/content/articles";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Essays & Field Notes | 4Schoolers" },
      {
        name: "description",
        content:
          "Essays on emotional intelligence, school choice, Ivy League admissions, and the pedagogy behind 4Schoolers' approach.",
      },
      { property: "og:title", content: "Resources — 4Schoolers" },
      {
        property: "og:description",
        content:
          "Essays on emotional intelligence, school choice, Ivy League admissions, and the pedagogy behind 4Schoolers' approach.",
      },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <Section className="pt-16 lg:pt-20">
      <FadeIn>
        <Eyebrow>Resources</Eyebrow>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl font-bold text-primary text-balance lg:text-6xl">
          Insights from inside the admissions office.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Field notes and essays from our senior consultants — on character,
          craft, and the long arc of preparation.
        </p>
      </FadeIn>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <FadeIn key={a.slug} delay={i * 0.06}>
            <Link
              to="/resources/$slug"
              params={{ slug: a.slug }}
              aria-label={`Read essay: ${a.title}`}
              className="group flex h-full flex-col rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-[var(--gold)]/50"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary/15 via-secondary to-[var(--gold)]/20">
                {a.cover ? (
                  <img
                    src={a.cover}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
              </div>
              <span className="mt-6 text-xs font-semibold uppercase tracking-wider text-[var(--gold-foreground)]/75">
                {a.tag}
              </span>
              <div className="flex-1">
                <h2 className="mt-2 font-serif text-lg font-semibold text-primary leading-snug">
                  {a.title}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {a.description}
                </p>
              </div>
              <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {a.date} · {a.readTime}
                </span>
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
