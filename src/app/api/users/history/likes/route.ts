import { NextRequest, NextResponse } from "next/server";
import { GetUserLikedAnswersUsecase } from "@/application/user/GetUserLikedAnswerUsecase";
import { SbUserRepository } from "@/infra/repositories/supabase/SbUserRepository";
import { UserLikedAnswerDto } from "@/application/user/dto/UserLikedAnswerDto";

const usecase = new GetUserLikedAnswersUsecase(new SbUserRepository());

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.json({ error: "이메일이 필요합니다." }, { status: 400 });

  try {
    const likedAnswers = await usecase.execute(email);
    const result = likedAnswers.map(UserLikedAnswerDto.fromEntity); // 🔥 변환 적용
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("좋아요한 답변 조회 실패:", error);
    return NextResponse.json(
      { error: "좋아요한 답변 정보를 불러오지 못했습니다." },
      { status: 500 }
    );
  }
}
