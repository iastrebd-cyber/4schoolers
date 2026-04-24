import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Circle, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Status = "not_started" | "in_progress" | "completed";

const STEPS = [
  { key: "testing", label: "Standardized tests (SAT/ACT)" },
  { key: "essays", label: "Personal essays" },
  { key: "recommendations", label: "Recommendation letters" },
  { key: "applications", label: "Application submission" },
  { key: "interviews", label: "Interviews" },
  { key: "decisions", label: "Decisions & final steps" },
] as const;

const NEXT: Record<Status, Status> = {
  not_started: "in_progress",
  in_progress: "completed",
  completed: "not_started",
};

export const Route = createFileRoute("/_authenticated/dashboard/progress")({
  component: ProgressPage,
});

function ProgressPage() {
  const auth = useAuth();
  const [statuses, setStatuses] = useState<Record<string, Status>>({});
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!auth.user) return;
    const { data } = await supabase
      .from("progress_steps")
      .select("step_key, status");
    const map: Record<string, Status> = {};
    (data ?? []).forEach((r) => {
      map[r.step_key] = r.status as Status;
    });
    setStatuses(map);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  const cycle = async (key: string) => {
    if (!auth.user) return;
    const cur = statuses[key] ?? "not_started";
    const next = NEXT[cur];
    const { error } = await supabase.from("progress_steps").upsert(
      {
        user_id: auth.user.id,
        step_key: key,
        status: next,
        completed_at: next === "completed" ? new Date().toISOString() : null,
      },
      { onConflict: "user_id,step_key" },
    );
    if (error) return toast.error(error.message);
    setStatuses((s) => ({ ...s, [key]: next }));
  };

  const completed = STEPS.filter((s) => statuses[s.key] === "completed").length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Preparation progress</span>
          <span className="text-sm font-normal text-muted-foreground">
            {completed} of {STEPS.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : (
          <ol className="space-y-3">
            {STEPS.map((step, i) => {
              const status = statuses[step.key] ?? "not_started";
              const Icon = status === "completed" ? Check : status === "in_progress" ? Loader : Circle;
              return (
                <li key={step.key} className="flex items-center justify-between gap-3 rounded-md border border-border bg-card p-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                        status === "completed" && "bg-primary text-primary-foreground",
                        status === "in_progress" && "bg-secondary text-secondary-foreground",
                        status === "not_started" && "bg-muted text-muted-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Step {i + 1}</p>
                      <p className="font-medium">{step.label}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => cycle(step.key)}>
                    {status === "not_started" && "Start"}
                    {status === "in_progress" && "Complete"}
                    {status === "completed" && "Reset"}
                  </Button>
                </li>
              );
            })}
          </ol>
        )}
      </CardContent>
    </Card>
  );
}
