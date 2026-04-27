import {
  createFileRoute,
  Link,
  notFound,
  useRouter,
} from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Section, FadeIn, Eyebrow } from "@/components/section";
import { getArticleBySlug, getRelatedArticles, type Block } from "@/content/articles";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const article = getArticleBySlug(params.slug);
    if (!article) throw notFound();
    return { article, related: getRelatedArticles(params.slug, 3) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Article — 4Schoolers" }] };
    const { article } = loaderData;
    const meta: Array<Record<string, string>> = [
      { title: `${article.title} — 4Schoolers` },
      { name: "description", content: article.description },
      { property: "og:title", content: article.title },
      { property: "og:description", content: article.description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: article.title },
      { name: "twitter:description", content: article.description },
    ];
    if (article.cover) {
      meta.push({ property: "og:image", content: article.cover });
      meta.push({ name: "twitter:image", content: article.cover });
    }
    return { meta };
  },
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <Section className="pt-16 lg:pt-20">
        <h1 className="font-serif text-3xl font-bold text-primary">
          Something went wrong
        </h1>
        <p className="mt-4 text-muted-foreground">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Retry
        </button>
      </Section>
    );
  },
  notFoundComponent: () => (
    <Section className="pt-16 lg:pt-20">
      <h1 className="font-serif text-4xl font-bold text-primary">
        Article not found
      </h1>
      <p className="mt-4 text-muted-foreground">
        The piece you're looking for has moved or never existed.
      </p>
      <Link
        to="/resources"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to all essays
      </Link>
    </Section>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { article, related } = Route.useLoaderData();

  return (
    <article>
      <Section className="pt-16 lg:pt-20">
        <FadeIn>
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to essays
          </Link>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="mt-10">
            <Eyebrow>{article.tag}</Eyebrow>
            <h1 className="mt-5 max-w-4xl font-serif text-4xl font-bold text-primary text-balance leading-[1.1] sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 text-sm uppercase tracking-[0.18em] text-muted-foreground">
              {article.date} · {article.readTime}
            </p>
          </div>
        </FadeIn>

        {article.cover ? (
          <FadeIn delay={0.1}>
            <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-secondary">
              <img
                src={article.cover}
                alt=""
                className="h-auto w-full max-h-[560px] object-cover"
              />
            </div>
          </FadeIn>
        ) : null}

        <div className="mt-14 mx-auto max-w-2xl">
          {article.blocks.map((block, i) => (
            <BlockRenderer key={i} block={block} index={i} />
          ))}
        </div>

        <FadeIn>
          <div className="mt-20 mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center sm:p-10">
            <p className="font-serif text-2xl text-primary leading-snug sm:text-3xl">
              Want this kind of preparation for your child?
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Start with a conversation. We'll listen first, then tell you
              honestly whether we're the right fit.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-md border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Talk to our team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </Section>

      {related.length > 0 ? (
        <Section ariaLabel="Related essays" className="border-t border-border">
          <FadeIn>
            <Eyebrow>Related reading</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-bold text-primary sm:text-4xl">
              Continue exploring.
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <FadeIn key={r.slug} delay={i * 0.06}>
                <Link
                  to="/resources/$slug"
                  params={{ slug: r.slug }}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-[var(--gold)]/50"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary/15 via-secondary to-[var(--gold)]/20">
                    {r.cover ? (
                      <img
                        src={r.cover}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                  <span className="mt-5 text-xs font-semibold uppercase tracking-wider text-[var(--gold-foreground)]/75">
                    {r.tag}
                  </span>
                  <h3 className="mt-2 font-serif text-lg font-semibold text-primary leading-snug">
                    {r.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">
                    {r.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Read essay
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Section>
      ) : null}
    </article>
  );
}

function BlockRenderer({ block, index }: { block: Block; index: number }) {
  switch (block.type) {
    case "lead":
      return (
        <FadeIn delay={Math.min(index * 0.03, 0.2)}>
          <p className="mb-8 font-serif text-2xl text-primary leading-snug first-letter:font-bold">
            {block.text}
          </p>
        </FadeIn>
      );
    case "p":
      return (
        <FadeIn delay={Math.min(index * 0.03, 0.2)}>
          <p className="mb-6 text-lg leading-[1.8] text-foreground/85">
            {block.text}
          </p>
        </FadeIn>
      );
    case "h2":
      return (
        <FadeIn delay={Math.min(index * 0.03, 0.2)}>
          <h2 className="mt-12 mb-5 font-serif text-2xl font-semibold text-primary sm:text-3xl">
            {block.text}
          </h2>
        </FadeIn>
      );
    case "list":
      return (
        <FadeIn delay={Math.min(index * 0.03, 0.2)}>
          {block.ordered ? (
            <ol className="mb-8 ml-6 list-decimal space-y-2 text-lg leading-[1.8] text-foreground/85 marker:text-[var(--gold)] marker:font-semibold">
              {block.items.map((item, i) => (
                <li key={i} className="pl-2">
                  {item}
                </li>
              ))}
            </ol>
          ) : (
            <ul className="mb-8 ml-6 list-disc space-y-2 text-lg leading-[1.8] text-foreground/85 marker:text-[var(--gold)]">
              {block.items.map((item, i) => (
                <li key={i} className="pl-2">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </FadeIn>
      );
    case "img":
      return (
        <FadeIn delay={Math.min(index * 0.03, 0.2)}>
          <figure className="my-10 -mx-2 sm:-mx-6 lg:-mx-12">
            <div className="overflow-hidden rounded-xl border border-border bg-secondary">
              <img
                src={block.src}
                alt={block.alt}
                loading="lazy"
                className="h-auto w-full object-cover"
              />
            </div>
            {block.caption ? (
              <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
                {block.caption}
              </figcaption>
            ) : null}
          </figure>
        </FadeIn>
      );
    case "quote":
      return (
        <FadeIn delay={Math.min(index * 0.03, 0.2)}>
          <blockquote className="my-10 border-l-2 border-[var(--gold)] pl-6">
            <p className="font-serif text-xl text-primary italic leading-relaxed whitespace-pre-line sm:text-2xl">
              {block.text}
            </p>
            {block.cite ? (
              <cite className="mt-3 block text-sm not-italic text-muted-foreground">
                — {block.cite}
              </cite>
            ) : null}
          </blockquote>
        </FadeIn>
      );
    case "video":
      return (
        <FadeIn delay={Math.min(index * 0.03, 0.2)}>
          <figure className="my-10">
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${block.id}`}
                title={block.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
              {block.title}
            </figcaption>
          </figure>
        </FadeIn>
      );
    default:
      return null;
  }
}
