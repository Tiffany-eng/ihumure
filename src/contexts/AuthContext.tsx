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
  resendConfirmation: (email: string) => Promise<{ error: Error | null }>;
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
          // Handle invalid refresh token error
          if (event === 'TOKEN_REFRESHED' && !session) {
            console.warn('Token refresh failed, clearing auth state');
            supabase.auth.signOut();
            return;
          }

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

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error.message);

        // Handle specific email confirmation error
        if (error.message === 'Email not confirmed') {
          return {
            error: new Error('Please check your email for a confirmation link. Click the link to activate your account, then try signing in again.')
          };
        }

        return { error: new Error(error.message) };
      }

      return { error: null };
    } catch (err) {
      console.error('Unexpected sign in error:', err);
      return { error: new Error('An unexpected error occurred during sign in') };
    }
  };

  const signOut = async () => {
    if (supabaseError) {
      return;
    }
    await supabase.auth.signOut();
  };

  const resendConfirmation = async (email: string) => {
    if (supabaseError) {
      return { error: new Error('Supabase not configured - running in demo mode') };
    }

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        console.error('Resend confirmation error:', error.message);
        return { error: new Error(error.message) };
      }

      return { error: null };
    } catch (err) {
      console.error('Unexpected resend error:', err);
      return { error: new Error('Failed to resend confirmation email') };
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut, resendConfirmation }}>
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
