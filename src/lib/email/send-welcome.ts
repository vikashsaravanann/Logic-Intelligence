import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendEmail } from "./send-email";
import WelcomeEmail from "@/emails/welcome-email";
import * as React from "react";

interface EnsureWelcomeOptions {
  userId?: string;
  email: string;
  fullName?: string | null;
  avatarUrl?: string | null;
}

/**
 * Idempotent welcome email.
 * Guarded by profiles.welcome_email_sent_at (actual schema column).
 */
export async function ensureWelcomeEmail({
  userId,
  email,
  fullName,
}: EnsureWelcomeOptions) {
  const cleanEmail = (email || "").trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes("@")) {
    return { success: false, message: "Invalid email address", alreadySent: false };
  }

  try {
    if (userId) {
      const { data: existing } = await supabaseAdmin
        .from("profiles")
        .select("welcome_email_sent_at")
        .eq("id", userId)
        .maybeSingle();

      if (existing?.welcome_email_sent_at) {
        return {
          success: true,
          message: "Welcome email already sent",
          alreadySent: true,
        };
      }
    }

    const emailResult = await sendEmail({
      to: cleanEmail,
      from: "noReply",
      subject: "Welcome to Logic Intelligence Technologies!",
      react: React.createElement(WelcomeEmail, {
        email: fullName || cleanEmail,
      }),
    });

    if (!emailResult.success) {
      console.error("[Email Error] Welcome email failed:", emailResult.message);
      return {
        success: false,
        message: emailResult.message,
        alreadySent: false,
      };
    }

    // Mark sent — only columns that exist on public.profiles
    if (userId) {
      const { error } = await supabaseAdmin.from("profiles").upsert(
        {
          id: userId,
          full_name: fullName || null,
          welcome_email_sent_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );
      if (error) {
        console.error("[DB Error] Failed to mark welcome_email_sent_at:", error);
      }
    }

    return {
      success: true,
      message: "Welcome email sent successfully",
      alreadySent: false,
    };
  } catch (error) {
    console.error("ensureWelcomeEmail Error:", error);
    return {
      success: false,
      message: "Internal server error",
      alreadySent: false,
    };
  }
}
