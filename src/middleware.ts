import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import auth from '@/auth'
export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('tourabi.sessionToken')?.value
  // const csrfToken = request.cookies.get('tourabi.csrfToken')?.value
  // console.log('middleware pathname:', request.nextUrl.pathname)
  // console.log('middleware sessionToken:', sessionToken)
  // console.log('middleware csrfToken:', csrfToken)
  if (!sessionToken) {
    if (!(request.nextUrl.pathname == '/login' || request.nextUrl.pathname == '/signup')) {
      return NextResponse.redirect(new URL('/login', request.url) )
    }
  } else {
    if (request.nextUrl.pathname == '/login' || request.nextUrl.pathname == '/signup') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest.json|.*\\.png$).*)'],
}