import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDataSource } from "@/lib/db";
import { Tea } from "@/entities/Tea";

const LIKED_TEAS_COOKIE = "liked_teas";

export async function POST(request: NextRequest) {
    try {
        const { teaId } = await request.json();

        if (!teaId || typeof teaId !== "number") {
            return NextResponse.json(
                {error: "Invalid tea ID"},
                {status: 400},
            );
        }

        const cookieStore = await cookies();
        const likedTeas = cookieStore.get(LIKED_TEAS_COOKIE);
        const likedTeaIds: number[] = likedTeas ? JSON.parse(likedTeas.value) : [];
        
        const isLiked = likedTeaIds.includes(teaId); 

        const dataSource = await getDataSource();
        const teaRepository = dataSource.getRepository(Tea);

        const tea = await teaRepository.findOne({where : {id: teaId}});

        if (!tea) {
            return NextResponse.json(
                {error: "Tea not found"},
                {status: 400}
            )
        }

        if (isLiked) {
            tea.numberOfLikes -= 1;
            const index = likedTeaIds.indexOf(teaId);
            likedTeaIds.splice(index, 1);
        } else {
            likedTeaIds.push(teaId);
            tea.numberOfLikes += 1;
        }

        await teaRepository.save(tea);

        const response = NextResponse.json(
            {
                success: true,
                isLiked: !isLiked,
            }
        )

        console.log(likedTeaIds);

        response.cookies.set(LIKED_TEAS_COOKIE, JSON.stringify(likedTeaIds), {
            maxAge: 60 * 60 * 24 * 365,
            httpOnly: false,
            sameSite: "lax"
        })

        return response;

    } catch (error) {
        console.error("Error during changing like state", error);
        return NextResponse.json(
            {error: "Failed to toogle like."},
            {status: 500}
        )
    }

}