import { NextRequest, NextResponse } from "next/server";
import { getQuizStructure } from "@/lib/mockQuizzes";


export async function GET(request: NextRequest, 
    context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const quiz = getQuizStructure(id);

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(quiz, { status: 200 });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz" },
      { status: 500 }
    );
  }
}
