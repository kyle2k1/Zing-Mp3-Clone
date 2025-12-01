import { getToken } from 'next-auth/jwt';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // Only check authentication for protected routes
  if (req.nextUrl.pathname.startsWith('/mymusic/uploaded')) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    // Redirect unauthenticated users from /mymusic routes
    if (!isAuthenticated) {
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: ['/mymusic/uploaded']
};
