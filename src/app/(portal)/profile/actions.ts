"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { env } from "@/config/env";
import { revalidatePath } from "next/cache";

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

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return { success: false, error: "Not authenticated" };
    }

    const fullName = formData.get("fullName") as string;
    const companyName = formData.get("companyName") as string;
    const phoneNumber = formData.get("phoneNumber") as string;

    const { supabaseAdmin } = await import("@/lib/supabase/admin");
    const { error } = await supabaseAdmin
      .from("profiles")
      .upsert({
        id: session.user.id,
        email: session.user.email,
        full_name: fullName,
        company_name: companyName,
        phone_number: phoneNumber,
      })
      .eq("id", session.user.id);

    if (error) {
      console.error("Failed to update profile:", error);
      return { success: false, error: error.message };
    }

    // Also update user metadata for full_name
    await supabase.auth.updateUser({
      data: { full_name: fullName }
    });

    revalidatePath("/profile");
    return { success: true };
  } catch (err: any) {
    console.error("Error updating profile:", err);
    return { success: false, error: err.message || "An unexpected error occurred" };
  }
}
