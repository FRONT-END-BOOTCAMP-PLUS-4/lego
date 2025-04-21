import { NextResponse } from "next/server";
import { SbQuestionRepository } from "@/infra/repositories/supabase/SbQuestionRepository";
import { GetQuestionListUsecase } from "@/application/usecase/question/GetQuestionListUsecase";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const categoryIdParam = searchParams.get("categoryId");
  
    const repo = new SbQuestionRepository();
    const usecase = new GetQuestionListUsecase(repo);
  
    try {
      const categoryId = categoryIdParam ? Number(categoryIdParam) : undefined;
  
      const questions = await usecase.execute(categoryId);
      return NextResponse.json(questions);
    } catch (e) {
      return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
  }