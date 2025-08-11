import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { nextUrl } = req;
  const isAuthed = !!token;
  const protectedPaths = ['/create', '/account', '/vault'];
  if (protectedPaths.some((p) => nextUrl.pathname.startsWith(p)) && !isAuthed) {
    const signInUrl = new URL('/api/auth/signin', nextUrl);
    signInUrl.searchParams.set('callbackUrl', nextUrl.toString());
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/create/:path*', '/account/:path*', '/vault/:path*'],
};