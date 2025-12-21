import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const pathname = request.nextUrl.pathname;

    const authPages = ["/login", "/register"];
    const protectedPages = ["/dashboard"];

    // =========================
    // 1. SUDAH LOGIN → cegah akses login/register
    // =========================
    const isAuthPage = authPages.some((route) =>
        pathname.startsWith(route)
    );

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/v2", request.url));
    }

    // =========================
    // 2. BELUM LOGIN → cegah akses protected page
    // =========================
    const isProtected = protectedPages.some((route) =>
        pathname.startsWith(route)
    ) || pathname.endsWith("/watch");

    if (!token && isProtected) {
        const loginUrl = new URL("/login", request.url);

        // simpan halaman asal (penting!)
        loginUrl.searchParams.set(
            "redirect",
            pathname + request.nextUrl.search
        );

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/register",
        "/dashboard/:path*",
        "/:path*/watch",
    ],
};

