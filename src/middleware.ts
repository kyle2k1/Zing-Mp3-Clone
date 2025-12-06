import { getToken } from 'next-auth/jwt';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  try {
    // Only check authentication for protected routes
    if (req.nextUrl.pathname.startsWith('/mymusic/uploaded')) {
      const token = await getToken({ req });
      const isAuthenticated = !!token;
      console.log({ token, isAuthenticated });
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
