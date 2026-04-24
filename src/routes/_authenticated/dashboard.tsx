import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
      <DashboardSidebar />
      <div className="flex-1 p-4 lg:p-8">
        <Outlet />
      </div>
    </div>
  );
}
