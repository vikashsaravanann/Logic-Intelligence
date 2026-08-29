import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase admin client.
 * Uses the service role key — bypasses Row Level Security.
 *
 * SECURITY RULES:
 * - This module is server-only (enforced by the "server-only" import above).
 * - NEVER import this in client components or files without "use server" / "use server-only".
 * - NEVER expose the service role key to the browser.
 * - Used only in: API route handlers, server actions, auth callbacks, webhooks.
 */

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";

const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "placeholder_key";

/**
 * Singleton admin client for server-only use.
 * Call this function in route handlers to get the admin client.
 */
export function createAdminClient() {
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      // Disable auto-refresh; admin client is stateless per request
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Shared singleton instance for use in API routes.
 * Import this instead of calling createClient inline.
 *
 * Usage:
 *   import { supabaseAdmin } from "@/lib/supabase/admin";
 *   const { data, error } = await supabaseAdmin.from("profiles").select("*");
 */
export const supabaseAdmin = createAdminClient();
