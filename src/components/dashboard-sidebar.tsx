import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  User,
  GraduationCap,
  ListChecks,
  CalendarCheck,
  Map,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const items = [
  { to: "/dashboard", label: "Главная", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/profile", label: "Профиль", icon: User },
  { to: "/dashboard/universities", label: "Университеты", icon: GraduationCap },
  { to: "/dashboard/quizzes", label: "Квизы", icon: ListChecks },
  { to: "/dashboard/sessions", label: "Сессии", icon: CalendarCheck },
  { to: "/dashboard/progress", label: "Прогресс", icon: Map },
] as const;

export function DashboardSidebar() {
  const auth = useAuth();
  const location = useLocation();

  return (
    <aside className="w-full border-b border-border bg-card lg:w-64 lg:border-b-0 lg:border-r lg:min-h-[calc(100vh-6rem)]">
      <div className="p-4 lg:p-6">
        <div className="mb-4 lg:mb-6">
          <p className="font-serif text-xl font-semibold">Кабинет</p>
          <p className="truncate text-xs text-muted-foreground">{auth.user?.email}</p>
        </div>
        <nav className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1">
          {items.map((item) => {
            const active = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/75 hover:bg-secondary hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 w-full"
          onClick={() => auth.signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" /> Выйти
        </Button>
      </div>
    </aside>
  );
}
