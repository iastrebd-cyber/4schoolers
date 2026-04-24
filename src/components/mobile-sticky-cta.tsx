import { Link, useLocation } from "@tanstack/react-router";
import { Phone, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function MobileStickyCTA() {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY || y < 200);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  if (location.pathname === "/quiz") return null;
  if (location.pathname.startsWith("/dashboard")) return null;
  if (["/login", "/signup", "/forgot-password", "/reset-password"].includes(location.pathname)) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-border bg-background/95 p-3 backdrop-blur-md transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <a
        href="tel:+16175550142"
        className="flex h-11 items-center justify-center gap-2 rounded-md border border-primary text-sm font-semibold text-primary"
      >
        <Phone className="h-4 w-4" /> Call
      </a>
      <Link
        to="/contact"
        className="flex h-11 items-center justify-center gap-2 rounded-md bg-[var(--gold)] text-sm font-semibold text-[var(--gold-foreground)]"
      >
        <Calendar className="h-4 w-4" /> Book
      </Link>
    </div>
  );
}
