import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /admin routes, but not /admin/login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const authToken = request.cookies.get('portfolio_admin_auth')?.value;

        if (authToken !== 'authenticated') {
            const loginUrl = new URL('/admin/login', request.url);
            loginUrl.searchParams.set('from', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
