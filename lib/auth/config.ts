import { UserRole } from "@/entities/User";
import { SessionOptions } from "iron-session";

export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || "QWERTYUIOPASDFGHJKLZXCVBNMQWERTY",
  accessTokenExpiry: "15m", 
  refreshTokenExpiry: "7d", 
  algorithm: "HS256" as const,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || "QWERTYUIOPASDFGHJKLZXCVBNMQWERTY",
  cookieName: "teashop_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  },
};

export interface SessionData {
  user?: {
    id: number;
    email: string;
    name: string;
    role: UserRole;
  };
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};
