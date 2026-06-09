import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type Row = {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  duration_minutes: number | null;
};

export const Route = createFileRoute("/_provider/provider/services")({
  component: ProviderServicesPage,
});

function ProviderServicesPage() {
  const auth = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "" as string | number,
    duration_minutes: "" as string | number,
  });

  const load = async () => {
    if (!auth.user) return;
    const { data } = await supabase
      .from("provider_services")
      .select("id, title, description, price, duration_minutes")
      .order("created_at", { ascending: false });
    setRows((data ?? []) as Row[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  const onAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.user) return;
    if (form.title.trim().length < 2) {
      toast.error("Enter a service title");
      return;
    }
    const { error } = await supabase.from("provider_services").insert({
      provider_id: auth.user.id,
      title: form.title.trim(),
      description: form.description.trim() || null,
      price: form.price ? Number(form.price) : null,
      duration_minutes: form.duration_minutes ? Number(form.duration_minutes) : null,
    });
    if (error) return toast.error(error.message);
    setForm({ title: "", description: "", price: "", duration_minutes: "" });
    toast.success("Service added");
    load();
  };

  const onDelete = async (id: string) => {
    const { error } = await supabase.from("provider_services").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setRows((r) => r.filter((x) => x.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add service</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onAdd} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="1-on-1 SAT Math"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                min={0}
                step="1"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min={0}
                step="15"
                value={form.duration_minutes}
                onChange={(e) => setForm({ ...form, duration_minutes: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit">Add</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My services ({rows.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : rows.length === 0 ? (
            <p className="text-muted-foreground">No services yet. Add your first offering.</p>
          ) : (
            <ul className="divide-y divide-border">
              {rows.map((r) => (
                <li key={r.id} className="flex items-start justify-between gap-3 py-3">
                  <div>
                    <p className="font-medium">{r.title}</p>
                    {r.description && (
                      <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
                    )}
                    <p className="mt-1 text-sm text-muted-foreground">
                      {r.price != null ? `$${r.price}` : "Price on request"}
                      {r.duration_minutes ? ` · ${r.duration_minutes} min` : ""}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(r.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
