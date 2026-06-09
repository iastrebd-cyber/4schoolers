import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import type { AccountType } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GraduationCap, Briefcase } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  full_name: z.string().trim().min(2, "At least 2 characters").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "At least 8 characters").max(128),
});
type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

const accountOptions: { value: AccountType; title: string; desc: string; icon: typeof GraduationCap }[] = [
  { value: "student", title: "Student / Parent", desc: "Plan admissions & find tutors", icon: GraduationCap },
  { value: "provider", title: "Provider / Tutor", desc: "List your services & get students", icon: Briefcase },
];

function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState<AccountType>("student");
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { full_name: "", email: "", password: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const redirectTo = `${window.location.origin}/login`;
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: redirectTo,
        data: { full_name: values.full_name, account_type: accountType },
      },
    });
    setLoading(false);
    if (error) {
      if (error.message.toLowerCase().includes("already")) {
        toast.error("This email is already registered");
      } else {
        toast.error(error.message);
      }
      return;
    }
    toast.success("Check your email to confirm your account");
    navigate({ to: "/login" });
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-md items-center px-4 py-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-serif text-2xl">Create account</CardTitle>
          <CardDescription>Choose how you'll use 4Schoolers</CardDescription>
        </CardHeader>
        <CardContent>
          <fieldset className="mb-5 grid grid-cols-2 gap-3">
            {accountOptions.map((opt) => {
              const selected = accountType === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setAccountType(opt.value)}
                  aria-pressed={selected}
                  className={cn(
                    "flex flex-col items-start gap-1 rounded-lg border p-3 text-left transition-colors",
                    selected
                      ? "border-[var(--gold)] bg-[var(--gold)]/10"
                      : "border-border hover:border-foreground/30",
                  )}
                >
                  <opt.icon className={cn("h-5 w-5", selected ? "text-[var(--gold)]" : "text-muted-foreground")} />
                  <span className="text-sm font-semibold">{opt.title}</span>
                  <span className="text-xs text-muted-foreground">{opt.desc}</span>
                </button>
              );
            })}
          </fieldset>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full name</Label>
              <Input id="full_name" autoComplete="name" {...form.register("full_name")} />
              {form.formState.errors.full_name && (
                <p className="text-sm text-destructive">{form.formState.errors.full_name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" autoComplete="new-password" {...form.register("password")} />
              {form.formState.errors.password && (
                <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : accountType === "provider" ? "Sign up as provider" : "Sign up"}
            </Button>
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
