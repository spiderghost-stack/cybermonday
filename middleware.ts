import { NextResponse, type NextRequest } from 'next/server'

export function middleware(_request: NextRequest) {
  // Simple pass-through for now.
  // Auth checks will be handled in individual Server Components / Server Actions.
  // Full Supabase session refresh middleware will be added once auth is fully wired.
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT static files and Next.js internals.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
