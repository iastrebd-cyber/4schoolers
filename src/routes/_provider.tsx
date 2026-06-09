import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_provider")({
  beforeLoad: ({ context, location }) => {
    const { auth } = context;
    // Wait until auth + role are resolved before deciding.
    if (auth.isLoading || auth.roleLoading) return;
    if (!auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
    // Only providers may enter the provider portal.
    if (auth.accountType !== "provider") {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: () => <Outlet />,
});
