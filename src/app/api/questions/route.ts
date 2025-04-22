import { NextRequest, NextResponse } from "next/server";
import { GetQuestionListUsecase } from "@/application/usecase/question/GetQuestionListUsecase";
import { SbQuestionRepository } from "@/infra/repositories/supabase/SbQuestionRepository";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const categoryId = searchParams.get("categoryId")
    ? Number(searchParams.get("categoryId"))
    : undefined;

  // ✅ email 기반으로 변경
  const email = searchParams.get("email") ?? undefined;

  const filter = (searchParams.get("filter") as "bookmarked" | "answered" | "all") ?? "all";
  const sortBy = (searchParams.get("sortBy") as "recent" | "bookmark") ?? "recent";

  const usecase = new GetQuestionListUsecase(new SbQuestionRepository());

  // ✅ userId → email 로 파라미터 변경
  const questions = await usecase.execute(categoryId, sortBy, email, filter);

  return NextResponse.json(questions);
}
