import { createFileRoute } from "@tanstack/react-router";
import { Section, FadeIn, Eyebrow } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Check } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Book a Free Strategy Session | 4Schoolers" },
      {
        name: "description",
        content:
          "Book a complimentary 30-minute strategy session with a senior 4Schoolers consultant. Boston, New York, and online.",
      },
      { property: "og:title", content: "Contact 4Schoolers" },
      { property: "og:description", content: "Book a free 30-minute college admissions strategy session." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  grade: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more").max(1500),
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = schema.safeParse(Object.fromEntries(fd));
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { if (i.path[0]) errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  return (
    <Section className="pt-16 lg:pt-20">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <FadeIn>
          <Eyebrow>Get in touch</Eyebrow>
          <h1 className="mt-4 font-serif text-5xl font-bold text-primary text-balance lg:text-6xl">
            Book a free 30-minute strategy session.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Talk with a senior consultant. We'll review your child's profile, answer your questions, and
            tell you honestly whether we're the right fit.
          </p>

          <ul className="mt-10 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                <Phone className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold text-foreground">(617) 555-0142</p>
                <p className="text-muted-foreground">Mon–Fri, 9am–7pm ET</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                <Mail className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold text-foreground">hello@4schoolers.com</p>
                <p className="text-muted-foreground">Replies within 1 business day</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold text-foreground">Boston · New York · Online</p>
                <p className="text-muted-foreground">In-person and remote sessions</p>
              </div>
            </li>
          </ul>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-border bg-card p-8 lg:p-10">
            {submitted ? (
              <div className="py-12 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--gold)]/20 text-[var(--gold-foreground)]">
                  <Check className="h-6 w-6 text-[var(--gold)]" />
                </span>
                <h2 className="mt-6 font-serif text-2xl font-bold text-primary">Thank you.</h2>
                <p className="mt-3 text-muted-foreground">
                  A senior consultant will be in touch within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full name *</Label>
                    <Input id="name" name="name" required className="mt-2 h-11" />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required className="mt-2 h-11" />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" type="tel" className="mt-2 h-11" />
                  </div>
                  <div>
                    <Label htmlFor="grade">Student grade</Label>
                    <Input id="grade" name="grade" placeholder="e.g. 10th grade" className="mt-2 h-11" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">How can we help? *</Label>
                  <Textarea id="message" name="message" rows={5} required className="mt-2" />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full bg-[var(--gold)] text-base text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90"
                >
                  Book My Strategy Session
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  No spam. Your information stays with our team.
                </p>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
