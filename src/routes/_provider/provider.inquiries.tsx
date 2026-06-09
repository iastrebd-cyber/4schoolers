import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type Status = "new" | "read" | "replied" | "closed";
type Row = {
  id: string;
  student_name: string | null;
  student_email: string | null;
  subject: string | null;
  message: string;
  status: Status;
  created_at: string;
};

const statusVariant: Record<Status, "default" | "secondary" | "outline"> = {
  new: "default",
  read: "secondary",
  replied: "secondary",
  closed: "outline",
};

export const Route = createFileRoute("/_provider/provider/inquiries")({
  component: ProviderInquiriesPage,
});

function ProviderInquiriesPage() {
  const auth = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!auth.user) return;
    const { data } = await supabase
      .from("inquiries")
      .select("id, student_name, student_email, subject, message, status, created_at")
      .eq("provider_id", auth.user.id)
      .order("created_at", { ascending: false });
    setRows((data ?? []) as Row[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  const onStatus = async (id: string, status: Status) => {
    const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inquiries ({rows.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : rows.length === 0 ? (
          <p className="text-muted-foreground">No inquiries yet.</p>
        ) : (
          <ul className="space-y-4">
            {rows.map((r) => (
              <li key={r.id} className="rounded-lg border border-border p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{r.student_name || "Student"}</p>
                      <Badge variant={statusVariant[r.status]}>{r.status}</Badge>
                    </div>
                    {r.student_email && (
                      <a
                        href={`mailto:${r.student_email}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {r.student_email}
                      </a>
                    )}
                  </div>
                  <Select value={r.status} onValueChange={(v) => onStatus(r.id, v as Status)}>
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {r.subject && <p className="mt-3 font-medium">{r.subject}</p>}
                <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{r.message}</p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
