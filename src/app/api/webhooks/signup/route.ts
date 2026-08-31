import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/send-email";
import WelcomeEmail from "@/emails/welcome-email";
import crypto from "crypto";
import * as React from "react";


export async function POST(req: Request) {
  try {
    // 1. Verify Webhook Secret (timing-safe)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing authorization header" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const expectedToken = process.env.SUPABASE_WEBHOOK_SECRET;

    if (!expectedToken) {
      console.warn("SUPABASE_WEBHOOK_SECRET is not configured.");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    // Timing-safe comparison to prevent timing attacks
    const isVerified = crypto.timingSafeEqual(
      Buffer.from(token),
      Buffer.from(expectedToken)
    );

    if (!isVerified) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse payload
    const body = await req.json();
    
    // We only care about auth.users INSERT events
    if (body.type !== "INSERT" || body.table !== "users") {
      return NextResponse.json({ message: "Ignored" });
    }

    const record = body.record;
    if (!record || !record.id || !record.email) {
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    const userId = record.id;
    const userEmail = record.email;

    // 3. Idempotency Check: Did we already send the welcome email?
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("welcome_email_sent")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("Failed to fetch profile for idempotency check:", profileError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    if (profile?.welcome_email_sent) {
      console.log(`Welcome email already sent to ${userEmail}`);
      return NextResponse.json({ message: "Already sent" });
    }

    // 4. Send Welcome Email via Nodemailer
    const emailResult = await sendEmail({
      to: userEmail,
      subject: "Welcome to Logic Intelligence Technologies",
      react: React.createElement(WelcomeEmail, { email: userEmail }),
    });

    if (!emailResult.success) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    // 5. Update Profile to mark welcome email as sent
    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ welcome_email_sent: true })
      .eq("id", userId);

    if (updateError) {
      console.error("Failed to update welcome_email_sent:", updateError);
      // We don't fail the request here since the email was already sent
    }

    return NextResponse.json({ success: true, message: "Welcome email sent successfully" });

  } catch (error) {
    console.error("Signup Webhook Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
