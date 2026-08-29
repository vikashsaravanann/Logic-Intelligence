import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If going to dashboard without a session, redirect to login
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    // Check for admin domain
    const email = session.user.email || '';
    if (!email.endsWith('@logicintelligencetechnologies.in')) {
      return NextResponse.redirect(new URL('/profile', req.url));
    }
  }

  // If going to profile without a session, redirect to login
  if (req.nextUrl.pathname.startsWith('/profile')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
