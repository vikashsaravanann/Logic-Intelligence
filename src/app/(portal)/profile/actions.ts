"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { env } from "@/config/env";
import { revalidatePath } from "next/cache";

/**
 * Persist profile fields that exist on public.profiles:
 * id, full_name, company_name, phone_number, role, …
 * (email lives on auth.users — do not write email here)
 */
export async function updateProfile(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerActionClient(
      { cookies: () => cookieStore as any },
      {
        supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      }
    );

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return { success: false, error: "Not authenticated. Please sign in again." };
    }

    const fullName = String(formData.get("fullName") || "").trim();
    const companyName = String(formData.get("companyName") || "").trim();
    const phoneNumber = String(formData.get("phoneNumber") || "").trim();

    if (!fullName) {
      return { success: false, error: "Full name is required." };
    }

    const { supabaseAdmin } = await import("@/lib/supabase/admin");
    const { error } = await supabaseAdmin.from("profiles").upsert(
      {
        id: session.user.id,
        full_name: fullName,
        company_name: companyName || null,
        phone_number: phoneNumber || null,
      },
      { onConflict: "id" }
    );

    if (error) {
      console.error("Failed to update profile:", error);
      return { success: false, error: error.message };
    }

    try {
      await supabase.auth.updateUser({
        data: { full_name: fullName },
      });
    } catch (metaErr) {
      console.warn("Profile DB saved; auth metadata update skipped:", metaErr);
    }

    revalidatePath("/profile");
    return { success: true };
  } catch (err: unknown) {
    console.error("Error updating profile:", err);
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return { success: false, error: message };
  }
}
