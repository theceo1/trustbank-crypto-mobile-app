
interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  DOJAH_API_KEY: string;
  DOJAH_PUBLIC_KEY: string;
  DOJAH_APP_ID: string;
  DOJAH_API_URL: string;
  QUIDAX_API_URL: string;
  QUIDAX_PUBLIC_KEY: string;
  ENABLE_ANALYTICS: boolean;
  MAINTENANCE_MODE: boolean;
  SITE_URL: string; // Added this property
}

// In a production app, you would use a proper .env solution with Expo
// For this demo, we're hardcoding the values
export const env: Env = {
  SUPABASE_URL: "https://xkxihvafbyegowhryojd.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhreGlodmFmYnllZ293aHJ5b2pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMzMwOTgsImV4cCI6MjA0ODkwOTA5OH0.BbXmFe3-y39l8BENL8GRdopGYZwd6PNlZYiXnsJfhEE",
  DOJAH_API_KEY: "prod_sk_N3KVhF4urA7ZV7Ck9kNY0kOP4",
  DOJAH_PUBLIC_KEY: "prod_pk_3AX4R8aiOoZ0WJL0VG8xD8fvL",
  DOJAH_APP_ID: "67391e50e45f5fc4445b4014",
  DOJAH_API_URL: "https://api.dojah.io",
  QUIDAX_API_URL: "https://www.quidax.com/api/v1",
  QUIDAX_PUBLIC_KEY: "wxJ5qUShutXT5hwv98fRLzSJ7MxnrgFwB768zFUL",
  ENABLE_ANALYTICS: true,
  MAINTENANCE_MODE: false,
  SITE_URL: "http://localhost:3000", // Added this value
};
