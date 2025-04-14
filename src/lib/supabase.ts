
import { createClient } from "@supabase/supabase-js";
import { env } from "@/config/env";

// Use the environment variables defined in env.ts
export const supabase = createClient(
  env.SUPABASE_URL, 
  env.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

// Google OAuth configuration
export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${env.SITE_URL}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });
    
    return { data, error };
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};
