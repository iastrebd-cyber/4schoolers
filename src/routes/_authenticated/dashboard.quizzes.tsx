import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Row = { id: string; quiz_type: string; score: number | null; recommended_track: string | null; created_at: string };

export const Route = createFileRoute("/_authenticated/dashboard/quizzes")({
  component: QuizzesPage,
});

function QuizzesPage() {
  const auth = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.user) return;
    (async () => {
      const { data } = await supabase
        .from("quiz_results")
        .select("id, quiz_type, score, recommended_track, created_at")
        .order("created_at", { ascending: false });
      setRows((data ?? []) as Row[]);
      setLoading(false);
    })();
  }, [auth.user]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>История квизов</CardTitle>
        <Button asChild variant="outline" size="sm">
          <Link to="/quiz">Пройти квиз</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Загрузка...</p>
        ) : rows.length === 0 ? (
          <p className="text-muted-foreground">Вы ещё не проходили квизы. Начните с диагностического теста.</p>
        ) : (
          <ul className="divide-y divide-border">
            {rows.map((r) => (
              <li key={r.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">{r.quiz_type}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(r.created_at).toLocaleDateString("ru-RU")}
                  </p>
                  {r.recommended_track && (
                    <Badge variant="secondary" className="mt-1">
                      {r.recommended_track}
                    </Badge>
                  )}
                </div>
                {r.score !== null && (
                  <p className="font-serif text-2xl font-semibold">{r.score}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
