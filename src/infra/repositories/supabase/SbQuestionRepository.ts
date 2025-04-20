import { supabase } from "@/utils/supabase/server";
import { QuestionRepository } from "@/domain/repositories/QuestionRepository";
import { QuestionDto } from "@/application/usecase/question/dto/QuestionDto";

export class SbQuestionRepository implements QuestionRepository{
    //전체 문제 출력
    async getAllQuestions(): Promise<QuestionDto[]> {
        const { data, error } = await supabase
      .from("question")
      .select("id, category_id, content, solution, views, created_at")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data.map(
      (item) =>
        new QuestionDto(
          item.id,
          item.category_id,
          item.content,
          item.solution,
          item.views,
          item.created_at
        )
    );
    }

    //카테고리별 문제 출력
    async  getQuestionsByCategory(categoryId: number): Promise<QuestionDto[]> {
        const { data, error } = await supabase
        .from("question")
        .select("id, category_id, content, solution, views, created_at")
        .eq("category_id", categoryId)
        .order("created_at", { ascending: false });
  
      if (error) throw new Error(error.message);
  
      return data.map(
        (item) =>
          new QuestionDto(
            item.id,
            item.category_id,
            item.content,
            item.solution,
            item.views,
            item.created_at
          )
      );
    }
}