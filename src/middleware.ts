import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  // Create a Supabase client configured to use cookies
  const { supabase, response } = createClient(request);

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if the request is for a protected route
  // Since we're using route groups, we need to check the actual paths
  // rather than the folder structure
  const isProtectedRoute = 
    request.nextUrl.pathname.startsWith('/espace-driver') || 
    request.nextUrl.pathname.startsWith('/espace-client') ||
    request.nextUrl.pathname.startsWith('/reset-password') ||
    request.nextUrl.pathname.startsWith('/become-driver');
  
  // Check if the request is for auth routes
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth') || 
    request.nextUrl.pathname.startsWith('/sign-in') || 
    request.nextUrl.pathname.startsWith('/sign-up') ||
    request.nextUrl.pathname.startsWith('/forgot-password');

  // If accessing a protected route without a session, redirect to sign-in
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/sign-in', request.url);
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If accessing auth pages with an active session, redirect to client dashboard
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/espace-client', request.url));
  }

  // Redirect root URL to the home page in public folder
  if (request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/', request.url));
  }

  return response;
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};