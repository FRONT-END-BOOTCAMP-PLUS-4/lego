import { GetAnswerListUsecase } from "@/application/usecase/answer/GetAnswerListUsecase";
import { AnswerRepository } from "@/domain/repositories/AnswerRepository";
import { SbAnswerRepository } from "@/infra/repositories/supabase/SbAnswerRepository";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: { questionId: string } }) {
  try {
    const questionId = Number(context.params.questionId);
    console.log("questionId", questionId);
    const answerRepo: AnswerRepository = new SbAnswerRepository();
    const getAnswerListUsecase = new GetAnswerListUsecase(answerRepo);
    const answers = await getAnswerListUsecase.execute(questionId);
    return NextResponse.json(
      { message: "문제에 달린 답변 조회 완료", date: answers },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating answer:", error);
    return NextResponse.json({ error: "문제에 달린 답변 조회 실패" }, { status: 500 });
  }
}
