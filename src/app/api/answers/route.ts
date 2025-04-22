import { CreateAnswerUsecase } from "@/application/usecase/answer/CreateAnswerUsecase";
import { DeleteAnswerUsecase } from "@/application/usecase/answer/DeleteAnswerUsecase";
import { CreateAnswerDto } from "@/application/usecase/answer/dto/CreateAnswerDto";
import { UpdateAnswerDto } from "@/application/usecase/answer/dto/UpdateAnswerDto";
import { UpdateAnswerUsecase } from "@/application/usecase/answer/UpdateAnswerUsecase";
import { SbAnswerRepository } from "@/infra/repositories/supabase/SbAnswerRepository";
import { NextResponse } from "next/server";

//답변 저장
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, questionId, content, userName, avatarUrl } = body;
    const answerDto = new CreateAnswerDto(userId, questionId, content, userName, avatarUrl);
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
