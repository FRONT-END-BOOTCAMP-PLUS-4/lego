import { GetAnswerDto } from "@/application/usecase/answer/dto/GetAnswerDto";
import { GetAnswerUsecase } from "@/application/usecase/answer/GetAnswerUsecase";
import { AnswerRepository } from "@/domain/repositories/AnswerRepository";
import { SbAnswerRepository } from "@/infra/repositories/supabase/SbAnswerRepository";
import { NextRequest, NextResponse } from "next/server";

//특정 문제의 특정 유저 답변 조회
export async function GET(request: NextRequest, context: { params: Record<string, string> }) {
  try {
    const params = await context.params;
    const questionId = Number(params.questionId);
    const answerAuthorId = params.userId;
    const currentUser = request.nextUrl.searchParams.get("currentUser");
    const answerDto = new GetAnswerDto(currentUser, Number(questionId), answerAuthorId);
    const answerRepo: AnswerRepository = new SbAnswerRepository();
    const getAnswerUsecase = new GetAnswerUsecase(answerRepo);
    const answers = await getAnswerUsecase.execute(answerDto);
    return NextResponse.json({ message: "답변 상세", data: answers }, { status: 200 });
  } catch (error) {
    console.error("Error creating answer:", error);
    return NextResponse.json({ error: "답변 상세 조회 실패" }, { status: 500 });
  }
}
