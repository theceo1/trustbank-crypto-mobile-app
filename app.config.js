// src/config/app.config.js
// Expo app config with Supabase keys in extra
export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    SUPABASE_URL: "https://xkxihvafbyegowhryojd.supabase.co",
    SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhreGlodmFmYnllZ293aHJ5b2pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMzMwOTgsImV4cCI6MjA0ODkwOTA5OH0.BbXmFe3-y39l8BENL8GRdopGYZwd6PNlZYiXnsJfhEE",
    SITE_URL: "https://trustbank.tech", // or your deployed site url if needed
    QUIDAX_SECRET_KEY: "lJ2RF5QlgfS4HB3Bat0wvgqF2xvYKaqaxpO17P9y",
    QUIDAX_PUBLIC_KEY: "wxJ5qUShutXT5hwv98fRLzSJ7MxnrgFwB768zFUL",
    QUIDAX_WEBHOOK_SECRET: "Pm8uMqAR7NlptTKzifojANi4g9fAW2HWXHFBUApi",
    QUIDAX_API_URL: "https://www.quidax.com/api/v1",
    QUIDAX_WEBHOOK_URL: "https://www.trustbank.tech/api/webhooks/quidax"
  }
});
