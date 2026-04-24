import { Outlet, Link, createRootRouteWithContext, HeadContent, Scripts, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileStickyCTA } from "@/components/mobile-sticky-cta";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import type { RouterContext } from "@/router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-serif font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "4Schoolers — Elite College Admissions Consulting" },
      {
        name: "description",
        content:
          "97% success rate placing students at Ivy League and top-tier universities. 150+ years of combined admissions expertise.",
      },
      { name: "author", content: "4Schoolers" },
      { property: "og:title", content: "4Schoolers — Elite College Admissions Consulting" },
      { name: "twitter:title", content: "4Schoolers — Elite College Admissions Consulting" },
      { name: "description", content: "Ivy Path Accelerator is a premium web application for elite college admissions consulting." },
      { property: "og:description", content: "Ivy Path Accelerator is a premium web application for elite college admissions consulting." },
      { name: "twitter:description", content: "Ivy Path Accelerator is a premium web application for elite college admissions consulting." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/20b7e6d3-7c91-4dc0-a959-639045fd167f/id-preview-3ccb47b2--19bce290-4145-4b92-aa3b-f614b34bea03.lovable.app-1776648204830.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/20b7e6d3-7c91-4dc0-a959-639045fd167f/id-preview-3ccb47b2--19bce290-4145-4b92-aa3b-f614b34bea03.lovable.app-1776648204830.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function AuthBridge() {
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    router.update({ context: { auth } });
    router.invalidate();
  }, [auth, router]);
  return null;
}

function RootComponent() {
  return (
    <AuthProvider>
      <AuthBridge />
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        <MobileStickyCTA />
      </div>
    </AuthProvider>
  );
}
