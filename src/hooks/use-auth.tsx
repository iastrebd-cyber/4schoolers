import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AccountType = "student" | "provider";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  session: Session | null;
  /** Account type from the user's profile; null when unknown/signed out. */
  accountType: AccountType | null;
  /** True while we're resolving the account type for a signed-in user. */
  roleLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    // Subscribe FIRST to avoid missing events
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      setIsLoading(false);
    });

    // Then load existing session
    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      setIsLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  // Resolve account type whenever the signed-in user changes.
  useEffect(() => {
    const userId = user?.id;
    if (!userId) {
      setAccountType(null);
      setRoleLoading(false);
      return;
    }
    let active = true;
    setRoleLoading(true);
    supabase
      .from("profiles")
      .select("account_type")
      .eq("id", userId)
      .maybeSingle()
      .then(({ data }) => {
        if (!active) return;
        setAccountType((data?.account_type as AccountType | undefined) ?? "student");
        setRoleLoading(false);
      });
    return () => {
      active = false;
    };
  }, [user?.id]);

  const value: AuthState = {
    isAuthenticated: !!session,
    isLoading,
    user,
    session,
    accountType,
    roleLoading,
    signOut: async () => {
      await supabase.auth.signOut();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
