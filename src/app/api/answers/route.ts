import { CreateAnswerUsecase } from "@/application/answer/CreateAnswerUsecase";
import { DeleteAnswerUsecase } from "@/application/answer/DeleteAnswerUsecase";
import { CreateAnswerDto } from "@/application/answer/dto/CreateAnswerDto";
import { CreatedAnswerDto } from "@/application/answer/dto/CreatedAnswerDto";
import { SbAnswerRepository } from "@/infra/repositories/supabase/SbAnswerRepository";
import { NextResponse } from "next/server";

interface RequestParams {
  params: {
    id: number; //questionId
  };
}

//답변 저장
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, questionId, content } = body;

    if (!userId || !questionId || !content) {
      return NextResponse.json({ error: "모든 필드를 입력해주세요." }, { status: 400 });
    }
    const answerDto = new CreateAnswerDto(body.userId, body.questionId, body.content, new Date());

    const createAnswerUsecase = new CreateAnswerUsecase(new SbAnswerRepository());
    const createdAnswerDto: CreatedAnswerDto = await createAnswerUsecase.execute(answerDto);
    return NextResponse.json(
      { message: "답변 등록 완료", data: createdAnswerDto },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating answer:", error);
    return NextResponse.json({ error: "답변 생성 실패" }, { status: 500 });
  }
}

//답변 삭제
export async function DELETE(request: Request, { params }: RequestParams) {
  const { id: questionId } = params;

  if (!questionId) {
    return NextResponse.json({ error: "문제 ID가 필요합니다" }, { status: 400 });
  }
  const body = await request.json();
  const { userId } = body;

  try {
    const usecase = new DeleteAnswerUsecase(new SbAnswerRepository());
    await usecase.execute({ userId, questionId });
    return NextResponse.json({ message: "삭제 완료" });
  } catch (error) {
    console.error("삭제 실패:", error);
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}

//답변 조회
export async function GET(request: Request) {}

//답변 수정
export async function PUT(request: Request) {}
