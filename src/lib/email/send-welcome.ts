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
 * Single source of truth for the Welcome email.
 * Idempotent: never sends twice (guarded by profiles.welcome_email_sent).
 * Used by: DB webhook, /api/auth/send-welcome, auth callback (OAuth).
 */
export async function ensureWelcomeEmail({ userId, email, fullName, avatarUrl }: EnsureWelcomeOptions) {
  const cleanEmail = (email || "").trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes("@")) {
    return { success: false, message: "Invalid email address", alreadySent: false };
  }

  try {
    // 1. Idempotency check (only possible when we know the profile id)
    if (userId) {
      const { data: existing } = await supabaseAdmin
        .from("profiles")
        .select("welcome_email_sent")
        .eq("id", userId)
        .single();
      if (existing?.welcome_email_sent) {
        return { success: true, message: "Welcome email already sent", alreadySent: true };
      }
    } else {
      const { data: byEmail } = await supabaseAdmin
        .from("profiles")
        .select("id, welcome_email_sent")
        .eq("email", cleanEmail)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      if (byEmail?.welcome_email_sent) {
        return { success: true, message: "Welcome email already sent", alreadySent: true };
      }
    }

    // 2. Send the Welcome email
    const emailResult = await sendEmail({
      to: cleanEmail,
      from: "noReply",
      subject: "Welcome to Logic Intelligence Technologies!",
      react: React.createElement(WelcomeEmail, { email: fullName || cleanEmail }),
    });

    if (!emailResult.success) {
      console.error("[Email Error] Welcome email failed to send:", emailResult.message);
      return { success: false, message: emailResult.message, alreadySent: false };
    }

    // 3. Record it so we never double-send
    try {
      if (userId) {
        await supabaseAdmin.from("profiles").upsert(
          {
            id: userId,
            email: cleanEmail,
            full_name: fullName || null,
            avatar_url: avatarUrl || null,
            welcome_email_sent: true,
          },
          { onConflict: "id" }
        );
      } else {
        await supabaseAdmin
          .from("profiles")
          .update({ welcome_email_sent: true })
          .eq("email", cleanEmail);
      }
    } catch (dbErr) {
      console.error("[DB Error] Failed to mark welcome_email_sent:", dbErr);
    }

    return { success: true, message: "Welcome email sent successfully", alreadySent: false };
  } catch (error) {
    console.error("ensureWelcomeEmail Error:", error);
    return { success: false, message: "Internal server error", alreadySent: false };
  }
}
