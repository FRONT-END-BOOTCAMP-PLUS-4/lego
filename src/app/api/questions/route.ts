//답변 조회

import { GetQuestionDto } from "@/application/question/dto/GetQuestionDto";
import { RespondQuestionDto } from "@/application/question/dto/RespondQuestionDto";
import { GetQuestionUsecase } from "@/application/question/GetQuestionUsecase";
import { SbQuestionRepository } from "@/infra/repositories/supabase/SbQuestionRepository";
import { NextResponse } from "next/server";

//이전에 해당 문제에 등록한 답변이 있으면 초기화면에 불러오기
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const questionId = Number(searchParams.get("questionId") ?? "1");

    const questionDto = new GetQuestionDto(questionId);
    const getQuestionRepo = new SbQuestionRepository();
    const getQuestionUsecase = new GetQuestionUsecase(getQuestionRepo);
    const respondQuestionDto: RespondQuestionDto = await getQuestionUsecase.execute(questionDto);

    return NextResponse.json(
      { message: "문제 조회 완료", data: respondQuestionDto },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating answer:", error);
    return NextResponse.json({ error: "문제 조회 실패" }, { status: 500 });
  }
}
