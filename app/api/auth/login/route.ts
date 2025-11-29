import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/ormconfig";
import { User } from "@/entities/User";
import { verifyPassword } from "@/lib/auth/password";
import { generateTokenPair } from "@/lib/auth/jwt";
import { createSession } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: "Account is inactive" },
        { status: 403 }
      );
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const { accessToken, refreshToken } = await generateTokenPair(user.id, user.email);

    await createSession(user.id, user.email, user.role);

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        accessToken,
        refreshToken,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
