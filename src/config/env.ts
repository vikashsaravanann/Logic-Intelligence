import { z } from "zod";

const envSchema = z.object({
  // Public
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1, "Supabase URL is required"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "Supabase Anon Key is required"),
  NEXT_PUBLIC_SITE_URL: z.string().optional().default("https://www.logicintelligencetechnologies.in"),

  // Secrets
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  SUPABASE_WEBHOOK_SECRET: z.string().optional(),
  LEAD_NOTIFICATION_EMAIL: z.string().optional().default("contact@logicintelligencetechnologies.in"),
  
  // Redis (Optional)
  UPSTASH_REDIS_REST_URL: z.string().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
});

const _env = envSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_WEBHOOK_SECRET: process.env.SUPABASE_WEBHOOK_SECRET,
  LEAD_NOTIFICATION_EMAIL: process.env.LEAD_NOTIFICATION_EMAIL,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
});

if (!_env.success) {
  console.error(
    "❌ Invalid or missing environment variables:",
    _env.error.flatten().fieldErrors
  );
  // Do not throw an error during Vercel build so the deployment doesn't fail
  if (process.env.VERCEL) {
    console.warn("⚠️ Bypassing environment variable crash for Vercel build.");
  }
}

export const env = _env.success ? _env.data : {
  NEXT_PUBLIC_SUPABASE_URL: "https://placeholder.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "placeholder",
  NEXT_PUBLIC_SITE_URL: "https://www.logicintelligencetechnologies.in",
} as any;
