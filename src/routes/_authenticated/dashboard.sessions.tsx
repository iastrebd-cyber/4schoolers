import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Status = "new" | "scheduled" | "completed" | "cancelled";
type Row = {
  id: string;
  requested_at: string;
  scheduled_at: string | null;
  status: Status;
  notes: string | null;
};

const statusLabel: Record<Status, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  new: { label: "New", variant: "default" },
  scheduled: { label: "Scheduled", variant: "secondary" },
  completed: { label: "Completed", variant: "outline" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

export const Route = createFileRoute("/_authenticated/dashboard/sessions")({
  component: SessionsPage,
});

function SessionsPage() {
  const auth = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!auth.user) return;
    const { data } = await supabase
      .from("consultation_requests")
      .select("id, requested_at, scheduled_at, status, notes")
      .order("requested_at", { ascending: false });
    setRows((data ?? []) as Row[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  const onRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.user) return;
    const { error } = await supabase.from("consultation_requests").insert({
      user_id: auth.user.id,
      notes: notes.trim() || null,
      status: "new",
    });
    if (error) return toast.error(error.message);
    setNotes("");
    toast.success("Request submitted");
    load();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Request a strategy session</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onRequest} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes">What would you like to discuss?</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., university shortlist, essay strategy..."
                rows={4}
              />
            </div>
            <Button type="submit">Submit request</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My requests ({rows.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : rows.length === 0 ? (
            <p className="text-muted-foreground">No requests yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {rows.map((r) => (
                <li key={r.id} className="py-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Created: {new Date(r.requested_at).toLocaleDateString("en-US")}
                      </p>
                      {r.scheduled_at && (
                        <p className="text-sm">
                          Scheduled for:{" "}
                          {new Date(r.scheduled_at).toLocaleString("en-US")}
                        </p>
                      )}
                      {r.notes && <p className="mt-1 text-sm">{r.notes}</p>}
                    </div>
                    <Badge variant={statusLabel[r.status].variant}>
                      {statusLabel[r.status].label}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
