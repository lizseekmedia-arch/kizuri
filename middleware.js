import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, isValidSessionCookie } from './lib/auth';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const valid = await isValidSessionCookie(cookie);

  if (!valid) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
