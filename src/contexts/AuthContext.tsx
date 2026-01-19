import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [supabaseError, setSupabaseError] = useState(false);

  useEffect(() => {
    // Check if Supabase is properly configured
    if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co') {
      console.warn('Supabase not configured - running in demo mode');
      setSupabaseError(true);
      setLoading(false);
      return;
    }

    try {
      // Set up auth state listener FIRST
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);

          // Defer profile updates with setTimeout
          if (event === 'SIGNED_IN' && session?.user) {
            setTimeout(() => {
              // Profile is created automatically via database trigger
            }, 0);
          }
        }
      );

      // THEN check for existing session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      console.error('Supabase auth initialization error:', error);
      setSupabaseError(true);
      setLoading(false);
    }
  }, []);

  const signUp = async (email: string, password: string, displayName?: string) => {
    if (supabaseError) {
      return { error: new Error('Supabase not configured - running in demo mode') };
    }

    const redirectUrl = `${window.location.origin}/`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          display_name: displayName,
        },
      },
    });

    if (!error && displayName) {
      // Update profile after signup
      setTimeout(async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from("profiles")
            .update({ display_name: displayName })
            .eq("id", user.id);
        }
      }, 500);
    }

    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    if (supabaseError) {
      return { error: new Error('Supabase not configured - running in demo mode') };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    if (supabaseError) {
      return;
    }
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
