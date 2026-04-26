import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function ServicesQuietStrip() {
  return (
    <section
      aria-label="Services overview"
      className="border-y border-border bg-secondary/30"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-8 lg:flex-row lg:justify-between lg:gap-10 lg:px-10 lg:py-10">
        <div className="flex flex-1 flex-col items-center gap-2 text-center lg:flex-row lg:items-baseline lg:gap-6 lg:text-left">
          <span className="text-sm text-foreground/80">
            Tutoring from{" "}
            <span className="font-medium text-primary">$[X]/hr</span>
          </span>
          <span className="hidden text-muted-foreground/40 lg:inline">·</span>
          <span className="text-sm text-foreground/80">
            Admissions packages from{" "}
            <span className="font-medium text-primary">$[X]</span>
          </span>
          <span className="hidden text-muted-foreground/40 lg:inline">·</span>
          <span className="text-sm text-foreground/80">
            <span className="font-medium text-primary">Free</span> first call
          </span>
        </div>
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 rounded-md border border-primary/40 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          See all services
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
