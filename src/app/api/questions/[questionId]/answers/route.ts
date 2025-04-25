import { GetAnswerDto } from "@/application/usecase/answer/dto/GetAnswerDto";
import { GetAnswerListUsecase } from "@/application/usecase/answer/GetAnswerListUsecase";
import { AnswerRepository } from "@/domain/repositories/AnswerRepository";
import { SbAnswerRepository } from "@/infra/repositories/supabase/SbAnswerRepository";
import { NextRequest, NextResponse } from "next/server";

//특정 문제의 답변들 조회
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: NextRequest, { params }: { params: any }) {
  try {
    const { questionId } = await params;
    const userId = request.nextUrl.searchParams.get("userId");

    const answerDto = new GetAnswerDto(userId, Number(questionId));
    const answerRepo: AnswerRepository = new SbAnswerRepository();
    const getAnswerListUsecase = new GetAnswerListUsecase(answerRepo);
    const answers = await getAnswerListUsecase.execute(answerDto);
    return NextResponse.json(
      { message: "문제에 달린 답변들 조회 완료", data: answers },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating answer:", error);
    return NextResponse.json({ error: "문제에 달린 답변들 조회 실패" }, { status: 500 });
  }
}
