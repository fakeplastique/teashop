import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/ormconfig";
import { User } from "@/entities/User";
import { hashPassword } from "@/lib/auth/password";
import { generateTokenPair } from "@/lib/auth/jwt";
import { createSession } from "@/lib/auth/session";
import { SignupSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = SignupSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {error: result.error.issues[0].message},
        {status: 400}
      )
    }

    const { email, password, name } = result.data;

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = userRepository.create({
      email,
      password: hashedPassword,
      name: name,
    });

    await userRepository.save(user);

    const { accessToken, refreshToken } = await generateTokenPair(user.id, user.email);

    await createSession(user.id, user.email);

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        accessToken,
        refreshToken,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
