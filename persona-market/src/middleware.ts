import { NextResponse } from 'next/server'

export function middleware() {
  return NextResponse.next()
}

export const config = {
  matcher: ['/chat/:path*', '/create', '/vault', '/settings', '/billing', '/admin'],
}