import { Link } from "@tanstack/react-router";

export function SoftBlogFooterNote() {
  return (
    <div className="mx-auto max-w-2xl border-t border-border px-6 py-12 text-center lg:py-16">
      <p className="font-serif text-lg italic leading-relaxed text-primary/85">
        Questions about your student's path?
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        We offer a free 30-minute conversation —{" "}
        <Link
          to="/services"
          className="text-primary underline-offset-4 hover:underline"
        >
          schedule one here
        </Link>
        .
      </p>
    </div>
  );
}
