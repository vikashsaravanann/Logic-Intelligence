import { createClient } from "@supabase/supabase-js";

/**
 * Browser-side Supabase client.
 * Uses the public anon key only — safe for client components.
 * DO NOT use for operations that require elevated privileges.
 */
export function createBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createClient(supabaseUrl, supabaseAnonKey);
}
