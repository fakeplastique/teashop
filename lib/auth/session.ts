import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, SessionData, defaultSession } from "./config";
import { UserRole } from "@/entities/User";



export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
}

export async function createSession(userId: number, email: string, role: UserRole = UserRole.USER) {
  const session = await getSession();

  session.user = {
    id: userId,
    email: email,
    role: role
  };
  session.isLoggedIn = true;

  await session.save();
  return session;
}

export async function destroySession() {
  const session = await getSession();
  session.destroy();
}


export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session.isLoggedIn === true && !!session.user;
}


export async function getCurrentUser() {
  const session = await getSession();
  return session.user || null;
}
