import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type Row = {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
};

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

export const Route = createFileRoute("/_provider/provider/availability")({
  component: ProviderAvailabilityPage,
});

function ProviderAvailabilityPage() {
  const auth = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState("1");
  const [start, setStart] = useState("16:00");
  const [end, setEnd] = useState("18:00");

  const load = async () => {
    if (!auth.user) return;
    const { data } = await supabase
      .from("provider_availability")
      .select("id, day_of_week, start_time, end_time")
      .order("day_of_week", { ascending: true })
      .order("start_time", { ascending: true });
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
    if (end <= start) {
      toast.error("End time must be after start time");
      return;
    }
    const { error } = await supabase.from("provider_availability").insert({
      provider_id: auth.user.id,
      day_of_week: Number(day),
      start_time: start,
      end_time: end,
    });
    if (error) return toast.error(error.message);
    toast.success("Availability added");
    load();
  };

  const onDelete = async (id: string) => {
    const { error } = await supabase.from("provider_availability").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setRows((r) => r.filter((x) => x.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add weekly slot</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onAdd} className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="space-y-2 sm:col-span-2">
              <Label>Day</Label>
              <Select value={day} onValueChange={setDay}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DAYS.map((d, i) => (
                    <SelectItem key={i} value={String(i)}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="start">Start</Label>
              <Input id="start" type="time" value={start} onChange={(e) => setStart(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">End</Label>
              <Input id="end" type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
            </div>
            <div className="sm:col-span-4">
              <Button type="submit">Add</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly availability ({rows.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : rows.length === 0 ? (
            <p className="text-muted-foreground">No slots yet. Add when you're available.</p>
          ) : (
            <ul className="divide-y divide-border">
              {rows.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 py-3">
                  <p className="font-medium">
                    {DAYS[r.day_of_week]}{" "}
                    <span className="font-normal text-muted-foreground">
                      {r.start_time.slice(0, 5)} – {r.end_time.slice(0, 5)}
                    </span>
                  </p>
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
