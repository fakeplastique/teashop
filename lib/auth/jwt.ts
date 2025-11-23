import { SignJWT, jwtVerify } from "jose";
import { JWT_CONFIG } from "./config";

export interface JWTPayload {
  userId: number;
  email: string;
  type: "access" | "refresh";
  [propName : string]: unknown;
}

const getSecretKey = () => new TextEncoder().encode(JWT_CONFIG.secret);


export async function generateAccessToken(userId: number, email: string): Promise<string> {
  const token = await new SignJWT({
    userId,
    email,
    type: "access",
  })
    .setProtectedHeader({ alg: JWT_CONFIG.algorithm })
    .setIssuedAt()
    .setExpirationTime(JWT_CONFIG.accessTokenExpiry)
    .sign(getSecretKey());

  return token;
}

export async function generateRefreshToken(userId: number, email: string): Promise<string> {
  const token = await new SignJWT({
    userId,
    email,
    type: "refresh",
  } as JWTPayload)
    .setProtectedHeader({ alg: JWT_CONFIG.algorithm })
    .setIssuedAt()
    .setExpirationTime(JWT_CONFIG.refreshTokenExpiry)
    .sign(getSecretKey());

  return token;
}


export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as JWTPayload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}


export async function generateTokenPair(userId: number, email: string) {
  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(userId, email),
    generateRefreshToken(userId, email),
  ]);

  return { accessToken, refreshToken };
}
