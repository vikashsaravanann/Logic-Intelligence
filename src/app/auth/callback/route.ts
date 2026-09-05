import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { sendLoginNotification } from "@/lib/email/send-login-notification";
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
        // Send Login Notification on successful OAuth login
        const emailResult = await sendLoginNotification(session.user.email, request.headers);
        
        if (!emailResult.success) {
          console.error("[Email Error] Login notification failed:", emailResult.message);
        }
      }
    } catch (error: any) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message || 'Authentication failed')}`, request.url));
    }
  }

  return NextResponse.redirect(new URL('/dashboard', request.url));
}
