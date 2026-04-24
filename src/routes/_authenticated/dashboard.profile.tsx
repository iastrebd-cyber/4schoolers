import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    full_name: "",
    phone: "",
    current_grade: "",
    graduation_year: "" as string | number,
    gpa: "" as string | number,
  });

  useEffect(() => {
    if (!auth.user) return;
    (async () => {
      const { data: row } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", auth.user!.id)
        .maybeSingle();
      if (row) {
        setData({
          full_name: row.full_name ?? "",
          phone: row.phone ?? "",
          current_grade: row.current_grade ?? "",
          graduation_year: row.graduation_year ?? "",
          gpa: row.gpa ?? "",
        });
      }
      setLoading(false);
    })();
  }, [auth.user]);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.user) return;
    if (data.full_name.trim().length < 2) {
      toast.error("Введите имя");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      full_name: data.full_name.trim(),
      phone: data.phone.trim() || null,
      current_grade: data.current_grade.trim() || null,
      graduation_year: data.graduation_year ? Number(data.graduation_year) : null,
      gpa: data.gpa ? Number(data.gpa) : null,
    }).eq("id", auth.user.id);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Профиль обновлён");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl">Профиль</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Загрузка...</p>
        ) : (
          <form onSubmit={onSave} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={auth.user?.email ?? ""} disabled />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="full_name">Имя и фамилия</Label>
              <Input
                id="full_name"
                value={data.full_name}
                onChange={(e) => setData({ ...data, full_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current_grade">Текущий класс</Label>
              <Input
                id="current_grade"
                placeholder="например, 11"
                value={data.current_grade}
                onChange={(e) => setData({ ...data, current_grade: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="graduation_year">Год выпуска</Label>
              <Input
                id="graduation_year"
                type="number"
                min={2024}
                max={2035}
                value={data.graduation_year}
                onChange={(e) => setData({ ...data, graduation_year: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gpa">Средний балл (GPA)</Label>
              <Input
                id="gpa"
                type="number"
                step="0.01"
                min={0}
                max={5}
                value={data.gpa}
                onChange={(e) => setData({ ...data, gpa: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" disabled={saving}>
                {saving ? "Сохранение..." : "Сохранить"}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
