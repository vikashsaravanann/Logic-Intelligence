import "server-only";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { env } from "@/config/env";

/**
 * Server-side Supabase client for Route Handlers and Server Components.
 * Reads and writes session cookies to maintain auth state across requests.
 *
 * SECURITY RULES:
 * - Server-only (enforced by "server-only" import above).
 * - Uses the public anon key — subject to Row Level Security.
 * - For operations requiring elevated privileges, use createAdminClient() from ./admin.
 *
 * Usage in Route Handlers:
 *   const supabase = await createServerClient();
 *   const { data: { session } } = await supabase.auth.getSession();
 */
export async function createServerClient() {
  const cookieStore = await cookies();
  return createRouteHandlerClient(
    { cookies: () => cookieStore as any },
    {
      supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }
  );
}
