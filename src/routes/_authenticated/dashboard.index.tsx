import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const auth = useAuth();
  const [counts, setCounts] = useState({ universities: 0, quizzes: 0, sessions: 0, progress: 0 });
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (!auth.user) return;
    (async () => {
      const [u, q, s, p, prof] = await Promise.all([
        supabase.from("target_universities").select("id", { count: "exact", head: true }),
        supabase.from("quiz_results").select("id", { count: "exact", head: true }),
        supabase.from("consultation_requests").select("id", { count: "exact", head: true }),
        supabase
          .from("progress_steps")
          .select("id", { count: "exact", head: true })
          .eq("status", "completed"),
        supabase.from("profiles").select("full_name").eq("id", auth.user!.id).maybeSingle(),
      ]);
      setCounts({
        universities: u.count ?? 0,
        quizzes: q.count ?? 0,
        sessions: s.count ?? 0,
        progress: p.count ?? 0,
      });
      setName(prof.data?.full_name ?? "");
    })();
  }, [auth.user]);

  const stats = [
    { label: "Университеты", value: counts.universities, to: "/dashboard/universities" },
    { label: "Квизы", value: counts.quizzes, to: "/dashboard/quizzes" },
    { label: "Сессии", value: counts.sessions, to: "/dashboard/sessions" },
    { label: "Этапы выполнены", value: counts.progress, to: "/dashboard/progress" },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold">
          Привет{name ? `, ${name.split(" ")[0]}` : ""}!
        </h1>
        <p className="mt-1 text-muted-foreground">Сводка вашей подготовки к поступлению</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-serif text-3xl font-semibold">{s.value}</p>
              <Link to={s.to} className="mt-2 inline-block text-xs text-primary hover:underline">
                Открыть →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Что дальше?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>1. Заполните <Link to="/dashboard/profile" className="text-primary hover:underline">профиль</Link> — это поможет нам подобрать стратегию.</p>
          <p>2. Добавьте <Link to="/dashboard/universities" className="text-primary hover:underline">целевые университеты</Link>.</p>
          <p>3. Запишитесь на <Link to="/dashboard/sessions" className="text-primary hover:underline">стратегическую сессию</Link>.</p>
          <Button asChild className="mt-2">
            <Link to="/dashboard/profile">Заполнить профиль</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
