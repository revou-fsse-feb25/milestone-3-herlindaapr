import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register");

  // Root path - redirect based on auth status
  if (req.nextUrl.pathname === "/") {
    if (isAuthenticated) {
      const role = token.role as string;
      const redirectUrl = role === "admin" ? "/admin" : "/home";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthPage) {
    const role = token.role as string;
    const redirectUrl = role === "admin" ? "/admin" : "/home";
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Handle admin routes
  if (isAuthenticated && req.nextUrl.pathname.startsWith("/admin")) {
    const role = token.role as string;

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/home/:path*", "/admin/:path*"],
};