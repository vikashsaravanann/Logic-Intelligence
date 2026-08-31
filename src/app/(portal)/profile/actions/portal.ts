"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { env } from "@/config/env";
import { Database } from "@/types/database";
import { revalidatePath } from "next/cache";

export async function getUserPortalData() {
  const cookieStore = await cookies();
  const supabase = createServerActionClient<Database>(
    { cookies: () => cookieStore as any },
    {
      supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const [
    { data: projects },
    { data: invoices },
    { data: supportTickets },
    { data: clientFiles },
    { data: onboarding },
  ] = await Promise.all([
    supabase.from("projects").select("*").eq("user_id", session.user.id).order("created_at", { ascending: false }),
    supabase.from("invoices").select("*").eq("user_id", session.user.id).order("created_at", { ascending: false }),
    supabase.from("support_tickets").select("*").eq("user_id", session.user.id).order("created_at", { ascending: false }),
    supabase.from("client_files").select("*").eq("user_id", session.user.id).order("created_at", { ascending: false }),
    supabase.from("onboarding_submissions").select("*").eq("user_id", session.user.id).order("created_at", { ascending: false }),
  ]);

  return {
    projects: projects || [],
    invoices: invoices || [],
    supportTickets: supportTickets || [],
    clientFiles: clientFiles || [],
    onboarding: onboarding || [],
    user: session.user,
  };
}

export async function createSupportTicket(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerActionClient<Database>(
      { cookies: () => cookieStore as any },
      {
        supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return { success: false, error: "Not authenticated" };

    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!subject || !message) return { success: false, error: "Missing required fields" };

    const { error } = await supabase.from("support_tickets").insert({
      user_id: session.user.id,
      subject,
      message,
      status: "Open"
    } as any);

    if (error) throw error;
    revalidatePath("/profile");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to create ticket" };
  }
}

export async function submitOnboardingForm(answers: any) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerActionClient<Database>(
      { cookies: () => cookieStore as any },
      {
        supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return { success: false, error: "Not authenticated" };

    const { error } = await supabase.from("onboarding_submissions").insert({
      user_id: session.user.id,
      answers_json: answers,
      status: "Submitted"
    } as any);

    if (error) throw error;
    revalidatePath("/profile");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to submit form" };
  }
}

export async function saveClientFileMetadata(fileName: string, filePath: string, size: number) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerActionClient<Database>(
      { cookies: () => cookieStore as any },
      {
        supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return { success: false, error: "Not authenticated" };

    const { error } = await supabase.from("client_files").insert({
      user_id: session.user.id,
      file_name: fileName,
      file_path: filePath,
      size
    } as any);

    if (error) throw error;
    revalidatePath("/profile");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save file metadata" };
  }
}
