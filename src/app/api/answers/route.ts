import { CreateAnswerUsecase } from "@/application/answer/CreateAnswerUsecase";
import { DeleteAnswerUsecase } from "@/application/answer/DeleteAnswerUsecase";
import { CreateAnswerDto } from "@/application/answer/dto/CreateAnswerDto";
import { GetAnswerDto } from "@/application/answer/dto/GetAnswerDto";
import { RespondAnswerDto } from "@/application/answer/dto/RespondAnswerDto";
import { UpdateAnswerDto } from "@/application/answer/dto/UpdateAnswerDto";
import { GetAnswerUsecase } from "@/application/answer/GetAnswerUsecase";
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
    const answerRepository = new SbAnswerRepository();
    const createAnswerUsecase = new CreateAnswerUsecase(answerRepository);
    const answer = await createAnswerUsecase.execute(answerDto);

    return NextResponse.json({ message: "답변 저장 완료", date: answer }, { status: 200 });
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
    const answerRepository = new SbAnswerRepository();
    const deleteAnswerUsecase = new DeleteAnswerUsecase(answerRepository);
    await deleteAnswerUsecase.execute({ userId, questionId });

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
    const answerRepository = new SbAnswerRepository();
    const updateAnswerUsecase = new UpdateAnswerUsecase(answerRepository);
    const answer = await updateAnswerUsecase.execute(answerDto);

    return NextResponse.json({ message: "답변 수정 완료", date: answer }, { status: 200 });
  } catch (error) {
    console.error("Error creating answer:", error);
    return NextResponse.json({ error: "답변 수정 실패" }, { status: 500 });
  }
}

//답변 조회
//이전에 해당 문제에 등록한 답변이 있으면 초기화면에 불러오기
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") ?? null;
    const questionId = Number(searchParams.get("questionId"));

    const answerDto = new GetAnswerDto(userId, questionId);
    const answerRepository = new SbAnswerRepository();
    const getAnswerUsecase = new GetAnswerUsecase(answerRepository);
    const respondAnswerDto: RespondAnswerDto = await getAnswerUsecase.execute(answerDto);

    return NextResponse.json(
      { message: "답변 조회 완료", data: respondAnswerDto },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating answer:", error);
    return NextResponse.json({ error: "답변 조회 실패" }, { status: 500 });
  }
}
