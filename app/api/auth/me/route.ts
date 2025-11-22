import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, isAuthenticated } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();

    if (!authenticated) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const user = await getCurrentUser();

    return NextResponse.json(
      {
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get current user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
