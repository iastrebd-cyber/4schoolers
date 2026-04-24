import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type Priority = "reach" | "target" | "safety";
type Row = { id: string; university_name: string; priority: Priority; notes: string | null };

const priorityLabel: Record<Priority, { label: string; variant: "default" | "secondary" | "outline" }> = {
  reach: { label: "Reach", variant: "default" },
  target: { label: "Target", variant: "secondary" },
  safety: { label: "Safety", variant: "outline" },
};

export const Route = createFileRoute("/_authenticated/dashboard/universities")({
  component: UniversitiesPage,
});

function UniversitiesPage() {
  const auth = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState<Priority>("target");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!auth.user) return;
    const { data } = await supabase
      .from("target_universities")
      .select("id, university_name, priority, notes")
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
    if (name.trim().length < 2) {
      toast.error("Введите название университета");
      return;
    }
    const { error } = await supabase.from("target_universities").insert({
      user_id: auth.user.id,
      university_name: name.trim(),
      priority,
      notes: notes.trim() || null,
    });
    if (error) return toast.error(error.message);
    setName("");
    setNotes("");
    setPriority("target");
    toast.success("Университет добавлен");
    load();
  };

  const onDelete = async (id: string) => {
    const { error } = await supabase.from("target_universities").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setRows((r) => r.filter((x) => x.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Добавить университет</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onAdd} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="uni">Название</Label>
              <Input id="uni" value={name} onChange={(e) => setName(e.target.value)} placeholder="Harvard University" />
            </div>
            <div className="space-y-2">
              <Label>Приоритет</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reach">Reach</SelectItem>
                  <SelectItem value="target">Target</SelectItem>
                  <SelectItem value="safety">Safety</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-3">
              <Label htmlFor="notes">Заметки</Label>
              <Input id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            <div className="sm:col-span-3">
              <Button type="submit">Добавить</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Мой список ({rows.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Загрузка...</p>
          ) : rows.length === 0 ? (
            <p className="text-muted-foreground">Список пуст. Добавьте первый университет.</p>
          ) : (
            <ul className="divide-y divide-border">
              {rows.map((r) => (
                <li key={r.id} className="flex items-start justify-between gap-3 py-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{r.university_name}</p>
                      <Badge variant={priorityLabel[r.priority].variant}>
                        {priorityLabel[r.priority].label}
                      </Badge>
                    </div>
                    {r.notes && <p className="mt-1 text-sm text-muted-foreground">{r.notes}</p>}
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
