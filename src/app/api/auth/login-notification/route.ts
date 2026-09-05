
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { sendEmail } from "@/lib/email/send-email";
import LoginNotificationEmail from "@/emails/login-notification-email";
import * as React from "react";
import { env } from "@/config/env";
import { UAParser } from 'ua-parser-js';

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

    let body: any = {};
    try { body = await request.json(); } catch(e) {}

    const uaString = request.headers.get("user-agent") || "";
    const parser = new UAParser(uaString);
    const result = parser.getResult();
    const deviceStr = [result.device.vendor, result.device.model, result.os.name].filter(Boolean).join(" ") || result.os.name || "Unknown Device";
    const browserStr = result.browser.name || "Unknown Browser";
    const deviceSummary = `${deviceStr} • ${browserStr}`;

    const ipAddress = request.headers.get('x-forwarded-for') || "Local Development";
    const city = request.headers.get('x-vercel-ip-city');
    const region = request.headers.get('x-vercel-ip-region');
    const country = request.headers.get('x-vercel-ip-country');
    
    let location = "Local Development";
    if (city || region || country) {
      location = [city, region, country].filter(Boolean).join(", ");
    }

    const adminEmail = process.env.ADMIN_ALERT_EMAIL || "admin@logicintelligencetechnologies.in";

    const emailResult = await sendEmail({
      to: adminEmail,
      from: "noReply",
      subject: `Client login: ${session.user.email}`,
      react: React.createElement(LoginNotificationEmail, { 
        email: session.user.email,
        loginTimestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        userAgent: uaString,
         // wait, location goes to deviceSummary? I'll pass it properly, let's fix template later.
        location: location,
        parsedDevice: deviceSummary,
        ipAddress: ipAddress,
        screenSize: body.screenSize,
        timezone: body.timezone
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
