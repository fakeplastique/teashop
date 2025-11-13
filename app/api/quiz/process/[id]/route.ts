import { NextRequest, NextResponse } from "next/server";
import { validateQuizAnswer } from "@/lib/mockQuizzes";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    if (!body.selectedAnswerId || typeof body.selectedAnswerId !== "string") {
      return NextResponse.json(
        { error: "No answer was selected." },
        { status: 400 }
      );
    }

    const result = validateQuizAnswer(id, body.selectedAnswerId);

    if (!result) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        isCorrect: result.isCorrect,
        correctAnswerId: result.correctAnswerId,
        explanation: result.explanation,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during processing quiz answer:", error);
    return NextResponse.json(
      { error: "Error during processing quiz answer." },
      { status: 500 }
    );
  }
}
