import { NextResponse } from "next/server";
import { SbCommentRepository } from "@/infra/repositories/supabase/SbCommentRepository";
import { GetCommentListUsecase } from "@/application/usecase/comment/GetCommentListUsecase";
import { CreateCommentUsecase } from "@/application/usecase/comment/CreateCommentUsecase";
import { CreateCommentDto } from "@/application/usecase/comment/dto/CreateCommentDto";

//댓글 리스트 출력
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const questionId = Number(searchParams.get("questionId"));
  const answerEmail = searchParams.get("answerEmail");

  if (!questionId || !answerEmail) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  const usecase = new GetCommentListUsecase(new SbCommentRepository());
  const dto = await usecase.execute(questionId, answerEmail);

  return NextResponse.json(dto);
}

//댓글 생성
export async function POST(req: Request) {
    const body = await req.json();
  
    const {
      questionId,
      answerEmail,
      content,
      email,
      username,
      avatarUrl,
    } = body;
  
    if (!questionId || !answerEmail || !content || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
  
    const usecase = new CreateCommentUsecase(new SbCommentRepository());
    const dto = new CreateCommentDto(
      questionId,
      answerEmail,
      content,
      email,
      username,
      avatarUrl
    );
  
    const createdComment = await usecase.execute(dto);
  
    return NextResponse.json(createdComment); // ✅ 응답 DTO 반환
  }