// src/lib/supabase.ts
// Expo React Native Supabase setup
// Install dependencies:
//   expo install @react-native-async-storage/async-storage
//   npm install react-native-url-polyfill @supabase/supabase-js

import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { env } from '@/config/env';

export const supabase = createClient(
"https://xkxihvafbyegowhryojd.supabase.co",  
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhreGlodmFmYnllZ293aHJ5b2pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMzMwOTgsImV4cCI6MjA0ODkwOTA5OH0.BbXmFe3-y39l8BENL8GRdopGYZwd6PNlZYiXnsJfhEE",
  {
    auth: {
      storage: AsyncStorage,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
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
