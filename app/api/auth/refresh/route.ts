import { NextRequest, NextResponse } from "next/server";
import { verifyToken, generateAccessToken } from "@/lib/auth/jwt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token is required" },
        { status: 400 }
      );
    }

    const payload = await verifyToken(refreshToken);

    if (!payload || payload.type !== "refresh") {
      return NextResponse.json(
        { error: "Invalid or expired refresh token" },
        { status: 401 }
      );
    }

    const newAccessToken = await generateAccessToken(payload.userId, payload.email);

    return NextResponse.json(
      {
        message: "Token refreshed successfully",
        accessToken: newAccessToken,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Token refresh error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
