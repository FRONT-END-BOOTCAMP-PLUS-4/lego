import { GetQuestionDto } from "@/application/usecase/question/dto/GetQuestionDto";
import { GetQuestionUsecase } from "@/application/usecase/question/GetQuestionUsecase";
import { SbQuestionRepository } from "@/infra/repositories/supabase/SbQuestionRepository";
import { NextRequest, NextResponse } from "next/server";

//이전에 해당 문제에 등록한 답변이 있으면 초기화면에 불러오기
//문제, 답변 조회

export async function GET(request: NextRequest, { params }: { params: any }) {
  try {
    const { questionId } = params;
    const userId = request.nextUrl.searchParams.get("userId") ?? undefined;
    const questionDto = new GetQuestionDto(Number(questionId), userId);
    const getQuestionRepo = new SbQuestionRepository();
    const getQuestionUsecase = new GetQuestionUsecase(getQuestionRepo);
    const respond = await getQuestionUsecase.execute(questionDto);

    return NextResponse.json({ message: "문제 조회 완료", data: respond }, { status: 200 });
  } catch (error) {
    console.error("Error creating answer:", error);
    return NextResponse.json({ error: "문제 조회 실패" }, { status: 500 });
  }
}
