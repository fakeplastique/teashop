import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, SessionData, defaultSession } from "./config";



export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
}

export async function createSession(userId: number, email: string) {
  const session = await getSession();

  session.user = {
    id: userId,
    email
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
