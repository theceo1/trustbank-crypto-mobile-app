
interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  DATABASE_URL: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  DOJAH_API_KEY: string;
  DOJAH_PUBLIC_KEY: string;
  DOJAH_APP_ID: string;
  DOJAH_API_URL: string;
  DOJAH_WEBHOOK_SECRET: string;
  QUIDAX_API_URL: string;
  QUIDAX_PUBLIC_KEY: string;
  QUIDAX_SECRET_KEY: string;
  QUIDAX_WEBHOOK_SECRET: string;
  QUIDAX_WEBHOOK_URL: string;
  UPSTASH_REDIS_REST_URL: string;
  UPSTASH_REDIS_REST_TOKEN: string;
  UPSTASH_REDIS_URL: string;
  ENABLE_ANALYTICS: boolean;
  MAINTENANCE_MODE: boolean;
  SITE_URL: string;
  SENTRY_DSN: string;
}

// In a production app, you would use a proper .env solution with Expo
// For this demo, we're hardcoding the values
import Constants from 'expo-constants';

export const env: Env = {
  SUPABASE_URL: Constants.expoConfig?.extra?.SUPABASE_URL || "",
  SUPABASE_ANON_KEY: Constants.expoConfig?.extra?.SUPABASE_ANON_KEY || "",
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  DATABASE_URL: process.env.DATABASE_URL || "",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  DOJAH_API_KEY: process.env.DOJAH_API_KEY || "",
  DOJAH_PUBLIC_KEY: process.env.DOJAH_PUBLIC_KEY || "",
  DOJAH_APP_ID: process.env.DOJAH_APP_ID || "",
  DOJAH_API_URL: process.env.NEXT_PUBLIC_DOJAH_API_URL || "",
  DOJAH_WEBHOOK_SECRET: process.env.DOJAH_WEBHOOK_SECRET || "",
  QUIDAX_API_URL: process.env.QUIDAX_API_URL || "",
  QUIDAX_PUBLIC_KEY: process.env.QUIDAX_PUBLIC_KEY || "",
  QUIDAX_SECRET_KEY: process.env.QUIDAX_SECRET_KEY || "",
  QUIDAX_WEBHOOK_SECRET: process.env.QUIDAX_WEBHOOK_SECRET || "",
  QUIDAX_WEBHOOK_URL: process.env.QUIDAX_WEBHOOK_URL || "",
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL || "",
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN || "",
  UPSTASH_REDIS_URL: process.env.UPSTASH_REDIS_URL || "",
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
  MAINTENANCE_MODE: process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true",
  SITE_URL: Constants.expoConfig?.extra?.SITE_URL || "",
  SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN || "",
};
