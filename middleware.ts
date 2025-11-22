import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/auth/config";

const protectedRoutes = [
  "/quiz"
];

const authRoutes = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(request, response, sessionOptions);

  const isAuthenticated = session.isLoggedIn === true && !!session.user;

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !isAuthenticated) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [

    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
