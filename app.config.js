// Expo app config with Supabase keys in extra
export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    SUPABASE_URL: "https://xkxihvafbyegowhryojd.supabase.co",
    SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhreGlodmFmYnllZ293aHJ5b2pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMzMwOTgsImV4cCI6MjA0ODkwOTA5OH0.BbXmFe3-y39l8BENL8GRdopGYZwd6PNlZYiXnsJfhEE",
    SITE_URL: "http://localhost:8081" // or your deployed site url if needed
  }
});
