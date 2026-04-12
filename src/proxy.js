// import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

// Define your protected routes here
const protectedRoutes = ["/profile"];

// Define public routes that authenticated users shouldn't access (like login, register)
const authRoutes = ["/login", "/register", "/forgot-password"];

export default async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get auth token from cookies
  const cookieStore = request.cookies;
  const authToken = cookieStore.get("auth_token")?.value;

  // Remove locale prefix to check actual route
  const pathnameWithoutLocale = pathname.replace(/^\/(en|bn|fr)/, "") || "/";

  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route),
  );

  // Check if current route is an auth route
  const isAuthRoute = authRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route),
  );

  // If trying to access protected route without auth token, redirect to login
  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated user tries to access auth routes (login/register), redirect to home
  if (isAuthRoute && authToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Continue with next-intl middleware for locale handling
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|server|trpc|_next|_vercel|.*\\..*).*)",
};
