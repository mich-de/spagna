import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_COOKIE = 'sol-auth'
const AUTH_SECRET = '2beb6b5fe3d7bdf658da84d6ce4252d853f7d4865e025f6b3970e39a3777fd4f'

export function middleware(request: NextRequest) {
  console.log('--- MIDDLEWARE RUNNING ---', request.nextUrl.pathname)
  if (request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.next()
  }

  const token = request.cookies.get(AUTH_COOKIE)?.value
  console.log('Token cookie:', token)

  if (token === AUTH_SECRET) {
    console.log('Access granted')
    return NextResponse.next()
  }

  console.log('Redirecting to login')
  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('from', request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.svg|.*\\..*).*)'],
}
