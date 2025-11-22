import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/helpers";

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(request);

    if (!auth.authenticated) {
      return auth.error;
    }

    return NextResponse.json(
      {
        user: auth.user,
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
