import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/ormconfig";
import { StaticPage } from "@/entities/StaticPage";
import { getCurrentUser } from "@/lib/auth/session";
import { UserRole } from "@/entities/User";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { slug } = await params;
    const body = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const staticPageRepository = AppDataSource.getRepository(StaticPage);

    const page = await staticPageRepository.findOne({ where: { slug } });

    if (!page) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      );
    }

    page.content = content;
    await staticPageRepository.save(page);

    return NextResponse.json(
      {
        message: "Page updated successfully",
        page: {
          id: page.id,
          slug: page.slug,
          title: page.title,
          content: page.content,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating static page:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
