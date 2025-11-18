import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    const token = await getToken({ req: request })
    const pathname = request.nextUrl.pathname

    const isAuth = !!token

    const pathsProtected = ['/']
    const isPathProtected = pathsProtected.some((path) => pathname.startsWith(path))

    const isAuthPage = pathname.startsWith('/login')

    //we should map when we are logged and not
    if (isAuth) {
        if (isAuthPage) {
            const dashboardUrl = new URL('/', request.url)
            return NextResponse.redirect(dashboardUrl)
        }

        return NextResponse.next()
    }
    //not logged
    if (isPathProtected) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname + request.nextUrl.search)
        return NextResponse.redirect(loginUrl)
    }


    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/login/:path*',
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}