import { CreateLikeUsecase } from "@/application/usecase/like/CreateLikeUsecase";
import { CreateLikeDto } from "@/application/usecase/like/dto/CreateLikeDto";
import { SbLikeRepository } from "@/infra/repositories/supabase/SbLikeRepository";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { questionId, answerEmail, userId } = body;
    const likeDto = new CreateLikeDto(questionId, answerEmail, userId);
    const likeRepo = new SbLikeRepository();
    const createBookmarkUsecase = new CreateLikeUsecase(likeRepo);
    const result = await createBookmarkUsecase.execute(likeDto);

    return NextResponse.json({ message: "답변 좋아요 완료", date: result }, { status: 200 });
  } catch (error) {
    console.error("Error creating answer:", error);
    return NextResponse.json({ error: "답변 좋아요 실패" }, { status: 500 });
  }
}
