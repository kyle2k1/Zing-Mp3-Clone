import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith('/mymusic') && !isAuthenticated) {
    return NextResponse.redirect(new URL(process.env.NEXTAUTH_URL));
  }
  const authMiddleware = await withAuth({
    pages: {
      signIn: '/login'
    }
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}

export const config = {
  matcher: ['/mymusic/uploaded']
};
