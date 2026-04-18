import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check, Calendar } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Find Your Admission Path — 2-Minute Quiz | 4Schoolers" },
      {
        name: "description",
        content:
          "Answer 4 quick questions and get a personalized college admissions roadmap from senior 4Schoolers consultants.",
      },
      { property: "og:title", content: "Find Your Admission Path — 4Schoolers" },
      {
        property: "og:description",
        content: "A 2-minute quiz to map out your college admissions strategy.",
      },
    ],
  }),
  component: QuizPage,
});

const grades = ["6th", "7th", "8th", "9th", "10th", "11th", "12th"];
const schools = ["Harvard", "Yale", "Princeton", "Stanford", "MIT", "Columbia", "Brown", "UPenn", "Duke", "Other Top-25"];
const challenges = [
  { t: "Essays & storytelling", d: "Finding the right voice and narrative." },
  { t: "Test prep (SAT/ACT)", d: "Boosting scores efficiently." },
  { t: "Activities & leadership", d: "Building a memorable profile." },
  { t: "School strategy", d: "Building the right school list." },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
});

function QuizPage() {
  const [step, setStep] = useState(0);
  const [grade, setGrade] = useState<string>("");
  const [targets, setTargets] = useState<string[]>([]);
  const [challenge, setChallenge] = useState<string>("");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const total = 4;
  const progress = ((step + 1) / total) * 100;

  function next() {
    if (step === 0 && !grade) return;
    if (step === 1 && targets.length === 0) return;
    if (step === 2 && !challenge) return;
    if (step === 3) {
      const r = contactSchema.safeParse(contact);
      if (!r.success) {
        const errs: Record<string, string> = {};
        r.error.issues.forEach((i) => { if (i.path[0]) errs[String(i.path[0])] = i.message; });
        setErrors(errs);
        return;
      }
      setErrors({});
      setDone(true);
      return;
    }
    setStep((s) => s + 1);
  }
  function back() { setStep((s) => Math.max(0, s - 1)); }
  function toggleTarget(s: string) {
    setTargets((cur) => cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}>
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--gold)]/20">
            <Check className="h-8 w-8 text-[var(--gold)]" />
          </span>
          <h1 className="mt-8 font-serif text-4xl font-bold text-primary text-balance lg:text-5xl">
            Your roadmap is on the way.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            We'll send your personalized admissions plan to <span className="font-semibold text-foreground">{contact.email}</span> within 24 hours.
          </p>
          <p className="mt-2 text-muted-foreground">
            Want to talk now? Book a free 30-minute strategy session.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 bg-[var(--gold)] px-7 text-base text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90">
              <Link to="/contact"><Calendar className="h-4 w-4" /> Book a Session</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-primary px-7 text-base text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 lg:py-20">
      <div className="mb-10">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-primary">Step {step + 1} of {total}</span>
          <span className="text-muted-foreground">Find your admission path</span>
        </div>
        <Progress value={progress} className="mt-3 bg-secondary [&>div]:bg-[var(--gold)]" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 0 && (
            <div>
              <h1 className="font-serif text-3xl font-bold text-primary text-balance lg:text-4xl">
                What grade is your student in?
              </h1>
              <p className="mt-3 text-muted-foreground">We'll tailor your roadmap to where you are now.</p>
              <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {grades.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGrade(g)}
                    className={cn(
                      "rounded-lg border-2 p-4 text-base font-semibold transition-all",
                      grade === g
                        ? "border-[var(--gold)] bg-[var(--gold)]/10 text-primary"
                        : "border-border bg-card text-foreground/70 hover:border-primary/40",
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h1 className="font-serif text-3xl font-bold text-primary text-balance lg:text-4xl">
                Which schools are on your radar?
              </h1>
              <p className="mt-3 text-muted-foreground">Pick all that apply.</p>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {schools.map((s) => {
                  const active = targets.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleTarget(s)}
                      className={cn(
                        "rounded-full border-2 px-4 py-2 text-sm font-medium transition-all",
                        active
                          ? "border-[var(--gold)] bg-[var(--gold)]/15 text-primary"
                          : "border-border bg-card text-foreground/70 hover:border-primary/40",
                      )}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="font-serif text-3xl font-bold text-primary text-balance lg:text-4xl">
                What's your biggest challenge right now?
              </h1>
              <p className="mt-3 text-muted-foreground">We'll focus your roadmap on what matters most.</p>
              <div className="mt-8 grid gap-3">
                {challenges.map((c) => (
                  <button
                    key={c.t}
                    type="button"
                    onClick={() => setChallenge(c.t)}
                    className={cn(
                      "rounded-lg border-2 p-5 text-left transition-all",
                      challenge === c.t
                        ? "border-[var(--gold)] bg-[var(--gold)]/10"
                        : "border-border bg-card hover:border-primary/40",
                    )}
                  >
                    <p className="font-serif text-lg font-semibold text-primary">{c.t}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1 className="font-serif text-3xl font-bold text-primary text-balance lg:text-4xl">
                Where should we send your roadmap?
              </h1>
              <p className="mt-3 text-muted-foreground">No spam — just your personalized plan.</p>
              <div className="mt-8 space-y-5">
                <div>
                  <Label htmlFor="name">Full name *</Label>
                  <Input id="name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} className="mt-2 h-12" />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className="mt-2 h-12" />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" type="tel" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className="mt-2 h-12" />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={back}
          disabled={step === 0}
          className="text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button
          type="button"
          onClick={next}
          size="lg"
          className="h-12 bg-[var(--gold)] px-7 text-base font-semibold text-[var(--gold-foreground)] hover:bg-[var(--gold)]/90"
        >
          {step === total - 1 ? "Get My Roadmap" : "Continue"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
