"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getDataSource } from "@/lib/db";
import { Tea } from "@/entities/Tea";

const LIKED_TEAS_COOKIE = "liked_teas";

export async function toggleLike(teaId: number) {
  const cookieStore = await cookies();
  const likedTeas = cookieStore.get(LIKED_TEAS_COOKIE);
  const likedTeaIds: number[] = likedTeas ? JSON.parse(likedTeas.value) : [];

  const isLiked = likedTeaIds.includes(teaId);
  const dataSource = await getDataSource();
  const teaRepository = dataSource.getRepository(Tea);

  const tea = await teaRepository.findOne({ where: { id: teaId } });
  if (!tea) {
    throw new Error("Tea not found");
  }

  if (isLiked) {
    // Unlike
    const index = likedTeaIds.indexOf(teaId);
    likedTeaIds.splice(index, 1);
    tea.numberOfLikes = Math.max(0, tea.numberOfLikes - 1);
  } else {
    // Like
    likedTeaIds.push(teaId);
    tea.numberOfLikes += 1;
  }

  await teaRepository.save(tea);

  // Update cookie
  const cookieOptions = {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: false,
    sameSite: "lax" as const,
  };

  cookieStore.set(LIKED_TEAS_COOKIE, JSON.stringify(likedTeaIds), cookieOptions);

  revalidatePath("/");
  revalidatePath(`/tea/${teaId}`);
  revalidatePath("/favorites");

  return { success: true, isLiked: !isLiked };
}

export async function getLikedTeaIds(): Promise<number[]> {
  const cookieStore = await cookies();
  const likedTeas = cookieStore.get(LIKED_TEAS_COOKIE);
  return likedTeas ? JSON.parse(likedTeas.value) : [];
}
