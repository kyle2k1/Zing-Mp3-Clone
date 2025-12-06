import { getToken } from 'next-auth/jwt';
import { type NextRequest, NextResponse } from 'next/server';

import { nextauth } from '@/libs/env';

export async function middleware(req: NextRequest) {
  try {
    // Only check authentication for protected routes
    if (req.nextUrl.pathname.startsWith('/mymusic/uploaded')) {
      // NextAuth v4: In production with secure cookies, it uses __Secure- prefix
      // getToken will auto-detect, but we can be explicit
      // Try without cookieName first (auto-detect), then fallback to explicit names
      let token = await getToken({ 
        req,
        secret: nextauth.secret,
      });
      
      // If token is null, try with explicit cookie names as fallback
      if (!token) {
        const cookieNames = [
          'next-auth.session-token',
          '__Secure-next-auth.session-token',
        ];
        
        for (const cookieName of cookieNames) {
          token = await getToken({ 
            req,
            secret: nextauth.secret,
            cookieName,
          });
          if (token) break;
        }
      }
      
      const isAuthenticated = !!token;
      
      // Debug logging
      console.log({ 
        token: token ? 'exists' : 'null', 
        isAuthenticated,
        allCookies: req.cookies.getAll().map(c => c.name),
        hasSessionCookie: !!req.cookies.get('next-auth.session-token'),
        hasSecureCookie: !!req.cookies.get('__Secure-next-auth.session-token'),
      });
      
      // Redirect unauthenticated users from /mymusic routes
      if (!isAuthenticated) {
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
