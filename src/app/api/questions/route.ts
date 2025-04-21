import { NextResponse } from "next/server";
import { GetQuestionListUsecase } from "@/application/usecase/question/GetQuestionListUsecase";
import { SbQuestionRepository } from "@/infra/repositories/supabase/SbQuestionRepository";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");
  const sortBy = (searchParams.get("sortBy") ?? "recent") as "recent" | "bookmark";

  const usecase = new GetQuestionListUsecase(new SbQuestionRepository());
  const result = await usecase.execute(
    categoryId ? Number(categoryId) : undefined,
    sortBy
  );

  return NextResponse.json(result);
}
