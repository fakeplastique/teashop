"use server";

import { cookies } from "next/headers";

const LIKED_TEAS_COOKIE = "liked_teas";

export async function getLikedTeaIds(): Promise<number[]> {
  const cookieStore = await cookies();
  const likedTeas = cookieStore.get(LIKED_TEAS_COOKIE);
  return likedTeas ? JSON.parse(likedTeas.value) : [];
}
