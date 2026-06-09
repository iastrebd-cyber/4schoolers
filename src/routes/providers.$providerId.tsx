import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Section, FadeIn, Eyebrow } from "@/components/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

type Provider = {
  id: string;
  display_name: string | null;
  headline: string | null;
  bio: string | null;
  specialties: string[];
  location: string | null;
  hourly_rate: number | null;
  currency: string;
  years_experience: number | null;
};
type Service = {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  duration_minutes: number | null;
};
type Slot = { id: string; day_of_week: number; start_time: string; end_time: string };

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export const Route = createFileRoute("/providers/$providerId")({
  component: ProviderDetailPage,
});

function ProviderDetailPage() {
  const { providerId } = Route.useParams();
  const auth = useAuth();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [{ data: p }, { data: svc }, { data: av }] = await Promise.all([
        supabase
          .from("provider_profiles")
          .select("id, display_name, headline, bio, specialties, location, hourly_rate, currency, years_experience")
          .eq("id", providerId)
          .eq("is_published", true)
          .maybeSingle(),
        supabase
          .from("provider_services")
          .select("id, title, description, price, duration_minutes")
          .eq("provider_id", providerId),
        supabase
          .from("provider_availability")
          .select("id, day_of_week, start_time, end_time")
          .eq("provider_id", providerId)
          .order("day_of_week", { ascending: true })
          .order("start_time", { ascending: true }),
      ]);
      setProvider((p as Provider) ?? null);
      setServices((svc ?? []) as Service[]);
      setSlots((av ?? []) as Slot[]);
      setLoading(false);
    })();
  }, [providerId]);

  const onSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.user) return;
    if (message.trim().length < 5) {
      toast.error("Please write a short message");
      return;
    }
    setSending(true);
    const { data: prof } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", auth.user.id)
      .maybeSingle();
    const { error } = await supabase.from("inquiries").insert({
      student_id: auth.user.id,
      provider_id: providerId,
      student_name: prof?.full_name ?? null,
      student_email: auth.user.email ?? null,
      subject: subject.trim() || null,
      message: message.trim(),
    });
    setSending(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(true);
    setSubject("");
    setMessage("");
    toast.success("Inquiry sent");
  };

  if (loading) {
    return (
      <Section className="pt-16 lg:pt-20">
        <p className="text-muted-foreground">Loading…</p>
      </Section>
    );
  }

  if (!provider) {
    return (
      <Section className="pt-16 lg:pt-20">
        <h1 className="font-serif text-4xl font-bold text-primary">Provider not found</h1>
        <p className="mt-4 text-muted-foreground">This profile is unavailable or unlisted.</p>
        <Link to="/providers" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to all tutors
        </Link>
      </Section>
    );
  }

  const isOwnProfile = auth.user?.id === provider.id;

  return (
    <Section className="pt-16 lg:pt-20">
      <FadeIn>
        <Link to="/providers" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="h-3.5 w-3.5" /> All tutors
        </Link>
      </FadeIn>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        {/* Main */}
        <FadeIn>
          <Eyebrow>Tutor</Eyebrow>
          <h1 className="mt-3 font-serif text-4xl font-bold text-primary lg:text-5xl">
            {provider.display_name || "Provider"}
          </h1>
          {provider.headline && (
            <p className="mt-3 text-lg text-muted-foreground">{provider.headline}</p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {provider.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {provider.location}
              </span>
            )}
            {provider.years_experience != null && <span>{provider.years_experience} yrs experience</span>}
            {provider.hourly_rate != null && (
              <span className="font-medium text-foreground">
                {provider.currency === "USD" ? "$" : `${provider.currency} `}
                {provider.hourly_rate}/hr
              </span>
            )}
          </div>

          {provider.specialties?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {provider.specialties.map((s) => (
                <Badge key={s} variant="secondary">{s}</Badge>
              ))}
            </div>
          )}

          {provider.bio && (
            <p className="mt-8 whitespace-pre-line leading-relaxed text-foreground/85">{provider.bio}</p>
          )}

          {services.length > 0 && (
            <div className="mt-10">
              <h2 className="font-serif text-2xl font-semibold text-primary">Services</h2>
              <ul className="mt-4 divide-y divide-border">
                {services.map((s) => (
                  <li key={s.id} className="py-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{s.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {s.price != null ? `$${s.price}` : "Price on request"}
                        {s.duration_minutes ? ` · ${s.duration_minutes} min` : ""}
                      </p>
                    </div>
                    {s.description && <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {slots.length > 0 && (
            <div className="mt-10">
              <h2 className="font-serif text-2xl font-semibold text-primary">Weekly availability</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {slots.map((sl) => (
                  <Badge key={sl.id} variant="outline">
                    {DAYS[sl.day_of_week]} {sl.start_time.slice(0, 5)}–{sl.end_time.slice(0, 5)}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </FadeIn>

        {/* Inquiry */}
        <FadeIn delay={0.1}>
          <Card className="lg:sticky lg:top-28">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Contact {provider.display_name || "this tutor"}</CardTitle>
            </CardHeader>
            <CardContent>
              {isOwnProfile ? (
                <p className="text-sm text-muted-foreground">
                  This is your public profile. <Link to="/provider/profile" className="text-primary hover:underline">Edit it here.</Link>
                </p>
              ) : !auth.isAuthenticated ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Sign in to send a message to this tutor.</p>
                  <Button asChild className="w-full">
                    <Link to="/login" search={{ redirect: `/providers/${provider.id}` }}>
                      Sign in to contact
                    </Link>
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    New here?{" "}
                    <Link to="/signup" className="text-primary hover:underline">Create an account</Link>
                  </p>
                </div>
              ) : sent ? (
                <p className="text-sm text-muted-foreground">
                  Your inquiry has been sent. The tutor will see it in their portal and can reply by email.
                </p>
              ) : (
                <form onSubmit={onSend} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="SAT Math help for my son"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Tell the tutor what you're looking for…"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={sending}>
                    {sending ? "Sending…" : "Send inquiry"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </Section>
  );
}
