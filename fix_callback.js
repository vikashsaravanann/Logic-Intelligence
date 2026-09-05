const fs = require('fs');

let code = `import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { sendEmail } from "@/lib/email/send-email";
import LoginNotificationEmail from "@/emails/login-notification-email";
import * as React from "react";
import { env } from "@/config/env";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient(
      { cookies: () => cookieStore as any },
      {
        supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      }
    );
    try {
      const { data: { session } } = await supabase.auth.exchangeCodeForSession(code);
      
      if (session?.user?.email) {
        // Send Login Notification on successful OAuth / Magic Link login
        const emailResult = await sendEmail({
          to: session.user.email,
          from: "noReply",
          subject: "New login to your Logic Intelligence account",
          react: React.createElement(LoginNotificationEmail, { 
            userEmail: session.user.email,
            time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            device: request.headers.get("user-agent") || "Unknown Device",
            location: "India" // Could use Vercel headers for precise location
          }),
        });
        
        if (!emailResult.success) {
          console.error("[Email Error] Login notification failed:", emailResult.message);
        }
      }
    } catch (error: any) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(new URL(\`/login?error=\${encodeURIComponent(error.message || 'Authentication failed')}\`, request.url));
    }
  }

  return NextResponse.redirect(new URL('/dashboard', request.url));
}
`;
fs.writeFileSync('src/app/auth/callback/route.ts', code);
console.log("Updated Callback");
