import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { sendEmail } from "@/lib/email/send-email";
import LoginNotificationEmail from "@/emails/login-notification-email";
import * as React from "react";
import { env } from "@/config/env";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient(
      { cookies: () => cookieStore as any },
      { supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL, supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY }
    );
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const emailResult = await sendEmail({
      to: session.user.email,
      from: "noReply",
      subject: "New login to your Logic Intelligence account",
      react: React.createElement(LoginNotificationEmail, { 
        email: session.user.email,
        loginTimestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        userAgent: request.headers.get("user-agent") || "Unknown Device",
        deviceSummary: "Unknown Location"
      }),
    });
    
    if (!emailResult.success) {
      console.error("[Email Error] Login notification failed:", emailResult.message);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Login Notification API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
