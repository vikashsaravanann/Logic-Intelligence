import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { env } from "@/config/env";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient(
    { cookies: () => cookieStore },
    {
      supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }
  );

  await supabase.auth.signOut();

  return NextResponse.redirect(new URL('/login', request.url), {
    status: 301,
  });
}
