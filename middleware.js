import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get("token")?.value;
    const pathname = request.nextUrl.pathname;

    const authPages = ["/login", "/register"];
    const protectedPages = ["/dashboard", "/v2"];

    // Jika SUDAH LOGIN → cegah akses login/register
    const isAuthPage = authPages.some((route) => pathname.startsWith(route));
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/v2", request.url));
    }

    // Jika BELUM LOGIN → cegah akses dashboard
    const isProtected = protectedPages.some((route) =>
        pathname.startsWith(route)
    );
    if (!token && isProtected) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/register",
        "/dashboard",
        "/dashboard/:path*",
        "/v2/:path*"
    ],
};
