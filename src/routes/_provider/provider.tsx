import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ProviderSidebar } from "@/components/provider-sidebar";

export const Route = createFileRoute("/_provider/provider")({
  component: ProviderLayout,
});

function ProviderLayout() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
      <ProviderSidebar />
      <div className="flex-1 p-4 lg:p-8">
        <Outlet />
      </div>
    </div>
  );
}
