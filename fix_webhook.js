const fs = require('fs');

let code = `import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/send-email";
import WelcomeEmail from "@/emails/welcome-email";
import crypto from "crypto";
import * as React from "react";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing authorization header" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const expectedToken = process.env.SUPABASE_WEBHOOK_SECRET;
    if (!expectedToken) return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });

    const isVerified = crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expectedToken));
    if (!isVerified) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    if (body.type !== "INSERT" || body.table !== "users") {
      return NextResponse.json({ message: "Ignored" });
    }

    const record = body.record;
    if (!record || !record.id || !record.email) {
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    const userId = record.id;
    const userEmail = record.email;

    // 1. Ensure Profile Exists (handle both OAuth and standard signup)
    let profileData;
    const { data: existingProfile } = await supabaseAdmin.from("profiles").select("welcome_email_sent").eq("id", userId).single();
    
    if (existingProfile) {
      profileData = existingProfile;
    } else {
      const { data: newProfile, error: insertError } = await supabaseAdmin.from("profiles").insert({
        id: userId,
        email: userEmail,
        full_name: record.raw_user_meta_data?.full_name || null,
        avatar_url: record.raw_user_meta_data?.avatar_url || record.raw_user_meta_data?.picture || null,
        welcome_email_sent: false
      }).select("welcome_email_sent").single();
      
      if (insertError) {
        console.error("Webhook Profile Insert Error:", insertError);
        return NextResponse.json({ error: "DB Error" }, { status: 500 });
      }
      profileData = newProfile;
    }

    // 2. Idempotency Check
    if (profileData?.welcome_email_sent) {
      console.log(\`Welcome email already sent to \${userEmail}\`);
      return NextResponse.json({ message: "Already sent" });
    }

    // 3. Send Welcome Email
    const emailResult = await sendEmail({
      to: userEmail,
      from: "noReply",
      subject: "Welcome to Logic Intelligence Technologies!",
      react: React.createElement(WelcomeEmail, { email: userEmail }),
    });

    if (!emailResult.success) {
      console.error("[Email Error] Welcome email failed to send:", emailResult.message);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    // 4. Update Profile
    await supabaseAdmin.from("profiles").update({ welcome_email_sent: true }).eq("id", userId);
    return NextResponse.json({ success: true, message: "Welcome email sent successfully" });

  } catch (error) {
    console.error("Signup Webhook Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
`;
fs.writeFileSync('src/app/api/webhooks/signup/route.ts', code);
console.log("Updated Webhook");
