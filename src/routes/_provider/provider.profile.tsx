import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/_provider/provider/profile")({
  component: ProviderProfilePage,
});

function ProviderProfilePage() {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    display_name: "",
    headline: "",
    bio: "",
    specialties: "",
    hourly_rate: "" as string | number,
    currency: "USD",
    location: "",
    years_experience: "" as string | number,
    is_published: true,
  });

  useEffect(() => {
    if (!auth.user) return;
    (async () => {
      const { data: row } = await supabase
        .from("provider_profiles")
        .select("*")
        .eq("id", auth.user!.id)
        .maybeSingle();
      if (row) {
        setData({
          display_name: row.display_name ?? "",
          headline: row.headline ?? "",
          bio: row.bio ?? "",
          specialties: (row.specialties ?? []).join(", "),
          hourly_rate: row.hourly_rate ?? "",
          currency: row.currency ?? "USD",
          location: row.location ?? "",
          years_experience: row.years_experience ?? "",
          is_published: row.is_published ?? true,
        });
      }
      setLoading(false);
    })();
  }, [auth.user]);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.user) return;
    setSaving(true);
    const specialties = data.specialties
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const { error } = await supabase
      .from("provider_profiles")
      .update({
        display_name: data.display_name.trim() || null,
        headline: data.headline.trim() || null,
        bio: data.bio.trim() || null,
        specialties,
        hourly_rate: data.hourly_rate ? Number(data.hourly_rate) : null,
        currency: data.currency.trim() || "USD",
        location: data.location.trim() || null,
        years_experience: data.years_experience ? Number(data.years_experience) : null,
        is_published: data.is_published,
      })
      .eq("id", auth.user.id);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Profile updated");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl">Provider profile</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : (
          <form onSubmit={onSave} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="display_name">Display name</Label>
              <Input
                id="display_name"
                placeholder="Dr. Jane Smith"
                value={data.display_name}
                onChange={(e) => setData({ ...data, display_name: e.target.value })}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                placeholder="SAT Math & Physics tutor · 5 years"
                value={data.headline}
                onChange={(e) => setData({ ...data, headline: e.target.value })}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                rows={5}
                placeholder="Tell families about your background and approach."
                value={data.bio}
                onChange={(e) => setData({ ...data, bio: e.target.value })}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="specialties">Specialties (comma-separated)</Label>
              <Input
                id="specialties"
                placeholder="SAT Math, Physics, Essay review"
                value={data.specialties}
                onChange={(e) => setData({ ...data, specialties: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hourly_rate">Hourly rate</Label>
              <Input
                id="hourly_rate"
                type="number"
                min={0}
                step="1"
                value={data.hourly_rate}
                onChange={(e) => setData({ ...data, hourly_rate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                value={data.currency}
                onChange={(e) => setData({ ...data, currency: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Remote · Boston, MA"
                value={data.location}
                onChange={(e) => setData({ ...data, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="years_experience">Years of experience</Label>
              <Input
                id="years_experience"
                type="number"
                min={0}
                max={60}
                value={data.years_experience}
                onChange={(e) => setData({ ...data, years_experience: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-4 sm:col-span-2">
              <div>
                <p className="text-sm font-medium">Published</p>
                <p className="text-sm text-muted-foreground">
                  When on, your profile appears in the public tutor directory.
                </p>
              </div>
              <Switch
                checked={data.is_published}
                onCheckedChange={(v) => setData({ ...data, is_published: v })}
              />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
