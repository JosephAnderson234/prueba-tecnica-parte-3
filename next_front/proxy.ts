import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    const token = await getToken({ req: request })
    const pathname = request.nextUrl.pathname

    const isAuth = !!token
    const isAuthPage = pathname.startsWith('/login')
    // Si está autenticado y está en página de login, redirigir al home
    if (isAuth && isAuthPage) {
        const dashboardUrl = new URL('/', request.url)
        return NextResponse.redirect(dashboardUrl)
    }

    // Si NO está autenticado y NO está en página de login, redirigir a login
    if (!isAuth && !isAuthPage) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname + request.nextUrl.search)
        return NextResponse.redirect(loginUrl)
    }

    // En cualquier otro caso, permitir acceso
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/login/:path*',
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}