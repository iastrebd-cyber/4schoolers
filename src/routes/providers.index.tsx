import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Section, FadeIn, Eyebrow } from "@/components/section";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowUpRight } from "lucide-react";

type Provider = {
  id: string;
  display_name: string | null;
  headline: string | null;
  specialties: string[];
  location: string | null;
  hourly_rate: number | null;
  currency: string;
};

export const Route = createFileRoute("/providers/")({
  head: () => ({
    meta: [
      { title: "Find a Tutor — 4Schoolers Provider Directory" },
      {
        name: "description",
        content:
          "Browse vetted tutors and educators on 4Schoolers. Filter by specialty and reach out directly.",
      },
    ],
  }),
  component: ProvidersIndexPage,
});

function ProvidersIndexPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("provider_profiles")
        .select("id, display_name, headline, specialties, location, hourly_rate, currency")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      setProviders((data ?? []) as Provider[]);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return providers;
    return providers.filter((p) => {
      const hay = [p.display_name, p.headline, p.location, ...(p.specialties ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [providers, query]);

  return (
    <Section className="pt-16 lg:pt-20">
      <FadeIn>
        <Eyebrow>Find a Tutor</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl font-bold text-primary text-balance lg:text-6xl">
          Browse our tutors & educators.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Explore providers by specialty, then reach out directly to start a conversation.
        </p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="mt-10 max-w-md">
          <Input
            placeholder="Search by subject, name, or location…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </FadeIn>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-muted-foreground">Loading providers…</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground">
            {providers.length === 0
              ? "No providers are listed yet. Check back soon."
              : "No providers match your search."}
          </p>
        ) : (
          filtered.map((p, i) => (
            <FadeIn key={p.id} delay={Math.min(i * 0.04, 0.2)}>
              <Link
                to="/providers/$providerId"
                params={{ providerId: p.id }}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-[var(--gold)]/50 hover:shadow-[0_18px_40px_-20px_oklch(0.24_0.07_265_/_0.25)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-serif text-xl font-semibold text-primary">
                    {p.display_name || "Provider"}
                  </h2>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                {p.headline && (
                  <p className="mt-1 text-sm text-muted-foreground">{p.headline}</p>
                )}
                {p.specialties?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.specialties.slice(0, 4).map((s) => (
                      <Badge key={s} variant="secondary">
                        {s}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="mt-4 flex flex-1 items-end justify-between text-sm text-muted-foreground">
                  {p.location ? (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {p.location}
                    </span>
                  ) : (
                    <span />
                  )}
                  {p.hourly_rate != null && (
                    <span className="font-medium text-foreground">
                      {p.currency === "USD" ? "$" : `${p.currency} `}
                      {p.hourly_rate}/hr
                    </span>
                  )}
                </div>
              </Link>
            </FadeIn>
          ))
        )}
      </div>
    </Section>
  );
}
