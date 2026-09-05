import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from "@supabase/supabase-js";
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { sendEmail } from "@/lib/email/send-email";
import WelcomeEmail from "@/emails/welcome-email";
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
      
      if (session?.user) {
        // Initialize Service Role client to bypass RLS for profile creation
        const supabaseServiceRole = createClient(
          env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );

        // Check if profile exists
        const { data: existingProfile } = await supabaseServiceRole
          .from("profiles")
          .select("welcome_email_sent")
          .eq("id", session.user.id)
          .single();

        // If profile doesn't exist, this is their first login
        if (!existingProfile) {
          // Send Welcome Email
          const email = session.user.email;
          if (email) {
            await sendEmail({
              to: email,
              from: "noReply",
              subject: "Welcome to Logic Intelligence Technologies",
              react: React.createElement(WelcomeEmail, { email: email }),
            });
          }

          // Create Profile and mark email as sent
          await supabaseServiceRole.from("profiles").insert({
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata?.full_name || null,
            avatar_url: session.user.user_metadata?.avatar_url || null,
            welcome_email_sent: true,
          });
        }
      }
    } catch (error: any) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message || 'Authentication failed')}`, request.url));
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/dashboard', request.url));
}
