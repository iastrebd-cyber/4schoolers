import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_provider/provider/")({
  component: ProviderHome,
});

function ProviderHome() {
  const auth = useAuth();
  const [counts, setCounts] = useState({ services: 0, availability: 0, newInquiries: 0 });
  const [headline, setHeadline] = useState<string>("");
  const [published, setPublished] = useState<boolean | null>(null);

  useEffect(() => {
    if (!auth.user) return;
    (async () => {
      const [svc, avail, inq, prof] = await Promise.all([
        supabase.from("provider_services").select("id", { count: "exact", head: true }),
        supabase.from("provider_availability").select("id", { count: "exact", head: true }),
        supabase
          .from("inquiries")
          .select("id", { count: "exact", head: true })
          .eq("status", "new"),
        supabase
          .from("provider_profiles")
          .select("headline, is_published")
          .eq("id", auth.user!.id)
          .maybeSingle(),
      ]);
      setCounts({
        services: svc.count ?? 0,
        availability: avail.count ?? 0,
        newInquiries: inq.count ?? 0,
      });
      setHeadline(prof.data?.headline ?? "");
      setPublished(prof.data?.is_published ?? null);
    })();
  }, [auth.user]);

  const stats = [
    { label: "Services", value: counts.services, to: "/provider/services" },
    { label: "Availability slots", value: counts.availability, to: "/provider/availability" },
    { label: "New inquiries", value: counts.newInquiries, to: "/provider/inquiries" },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-serif text-3xl font-semibold">
          {headline ? headline : "Your provider portal"}
        </h1>
        {published !== null && (
          <Badge variant={published ? "default" : "outline"}>
            {published ? "Published" : "Unlisted"}
          </Badge>
        )}
      </div>
      <p className="text-muted-foreground">Manage your listing, services, and student inquiries.</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-serif text-3xl font-semibold">{s.value}</p>
              <Link to={s.to} className="mt-2 inline-block text-xs text-primary hover:underline">
                Open →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Get set up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>1. Complete your <Link to="/provider/profile" className="text-primary hover:underline">profile</Link> — headline, bio, specialties, and rate.</p>
          <p>2. List the <Link to="/provider/services" className="text-primary hover:underline">services</Link> you offer.</p>
          <p>3. Set your weekly <Link to="/provider/availability" className="text-primary hover:underline">availability</Link>.</p>
          <p>4. Respond to <Link to="/provider/inquiries" className="text-primary hover:underline">student inquiries</Link> as they arrive.</p>
          <Button asChild className="mt-2">
            <Link to="/provider/profile">Edit profile</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
