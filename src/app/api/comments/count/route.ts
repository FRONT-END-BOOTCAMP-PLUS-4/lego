//댓글 개수 카운트

import { NextResponse } from "next/server";
import { SbCommentRepository } from "@/infra/repositories/supabase/SbCommentRepository";
import { GetCommentCountUsecase } from "@/application/usecase/comment/GetCommentCountUsecase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const questionId = Number(searchParams.get("questionId"));
  const answerEmail = searchParams.get("answerEmail");

  if (!questionId || !answerEmail) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  const usecase = new GetCommentCountUsecase(new SbCommentRepository());
  const dto = await usecase.execute(questionId, answerEmail);

  return NextResponse.json(dto);
}