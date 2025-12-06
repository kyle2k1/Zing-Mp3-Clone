import { getToken } from 'next-auth/jwt';
import { type NextRequest, NextResponse } from 'next/server';

import { nextauth } from '@/libs/env';

export async function middleware(req: NextRequest) {
  try {
    // Only check authentication for protected routes
    if (req.nextUrl.pathname.startsWith('/mymusic/uploaded')) {
      // NextAuth v4: Explicitly pass cookieName to match the configured cookie name
      // The cookie name is set in authOptions.cookies.sessionToken.name
      const cookieName = 'next-auth.session-token';
      
      const token = await getToken({ 
        req,
        secret: nextauth.secret,
        cookieName,
      });
      
      // Redirect unauthenticated users from /mymusic routes
      if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
      }
    }
  } catch (error) {
    // If middleware fails, allow the request to continue
    // The page component will handle authentication
    console.error('Middleware error:', error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/mymusic/uploaded/:path*'],
};
