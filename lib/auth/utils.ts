import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./jwt";
import { isAuthenticated, getCurrentUser } from "./session";


export async function requireAuth(request: NextRequest) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return {
        authenticated: false,
        user: null,
        error: NextResponse.json({ error: "Not authenticated" }, { status: 401 }),
      };
    }

    const token = authHeader.substring(7);
    const payload = await verifyToken(token);

    if (!payload || payload.type !== "access") {
      return {
        authenticated: false,
        user: null,
        error: NextResponse.json({ error: "Invalid or expired token" }, { status: 401 }),
      };
    }

    return {
      authenticated: true,
      user: {
        id: payload.userId,
        email: payload.email,
      },
      error: null,
    };
  }

  const user = await getCurrentUser();
  return {
    authenticated: true,
    user,
    error: null,
  };
}


export async function getUserFromRequest(request: NextRequest) {
  const auth = await requireAuth(request);
  return auth.user;
}