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

// We parse process.env safely so we don't throw an error that crashes the whole site.
// We just log warnings if things are missing when they are needed.
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(
    "❌ Invalid environment variables:",
    _env.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
