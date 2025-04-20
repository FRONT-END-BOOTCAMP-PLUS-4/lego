import { CreateAnswerUsecase } from "@/application/answer/CreateAnswerUsecase";
import { DeleteAnswerUsecase } from "@/application/answer/DeleteAnswerUsecase";
import { CreateAnswerDto } from "@/application/answer/dto/CreateAnswerDto";
import { CreatedAnswerDto, GetAnswerDto } from "@/application/answer/dto/GetAnswerDto";
import { UpdateAnswerDto } from "@/application/answer/dto/UpdateAnswerDto";
import { UpdateAnswerUsecase } from "@/application/answer/UpdateAnswerUsecase";
import { SbAnswerRepository } from "@/infra/repositories/supabase/SbAnswerRepository";
import { NextResponse } from "next/server";
import { URL } from "url";

//답변 저장
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, questionId, content } = body;

    const answerDto = new CreateAnswerDto(userId, questionId, content, new Date());
    const createAnswerUsecase = new CreateAnswerUsecase(new SbAnswerRepository());
    const createdAnswerDto: CreatedAnswerDto = await createAnswerUsecase.execute(answerDto);
    return NextResponse.json(
      { message: "답변 등록 완료", data: createdAnswerDto },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating answer:", error);
    return NextResponse.json({ error: "답변 등록 실패" }, { status: 500 });
  }
}

//답변 삭제
export async function DELETE(request: Request) {
  const body = await request.json();
  const { userId, questionId } = body;
  try {
    const usecase = new DeleteAnswerUsecase(new SbAnswerRepository());
    await usecase.execute({ userId, questionId });
    return NextResponse.json({ message: "답변 삭제 완료" });
  } catch (error) {
    console.error("삭제 실패:", error);
    return NextResponse.json({ error: "답변 삭제 실패" }, { status: 500 });
  }
}

//답변 수정
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { userId, questionId, content } = body;

    const answerDto = new UpdateAnswerDto(userId, questionId, content);
    const updateAnswerUsecase = new UpdateAnswerUsecase(new SbAnswerRepository());
    const updateAnswerDto: CreatedAnswerDto = await updateAnswerUsecase.execute(answerDto);
    return NextResponse.json({ message: "답변 수정 완료", data: updateAnswerDto }, { status: 201 });
  } catch (error) {
    console.error("Error creating answer:", error);
    return NextResponse.json({ error: "답변 수정 실패" }, { status: 500 });
  }
}

//답변 조회
//이전에 해당 문제에 등록한 답변이 있으면 초기화면에 불러오기
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") ?? null;
  const questionId = Number(searchParams.get("questionId"));
  const getDto = new GetAnswerDto(userId, questionId);
}
