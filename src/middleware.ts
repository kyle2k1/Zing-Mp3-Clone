import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

import { nextauth } from '@/libs/env';

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    // Redirect unauthenticated users from /mymusic routes
    if (req.nextUrl.pathname.startsWith('/mymusic') && !isAuthenticated) {
      return NextResponse.redirect(new URL(nextauth.url));
    }
  },
  {
    pages: {
      signIn: '/' // Redirect to home page (login modal will be shown)
    }
  }
);

export const config = {
  matcher: ['/mymusic/uploaded']
};
