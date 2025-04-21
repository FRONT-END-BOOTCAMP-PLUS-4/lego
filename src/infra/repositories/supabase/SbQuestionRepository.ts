import { createClient } from "@/utils/supabase/server"; //createClient 함수
import { QuestionRepository } from "@/domain/repositories/QuestionRepository";
import { QuestionDto } from "@/application/usecase/question/dto/QuestionDto";

export class SbQuestionRepository implements QuestionRepository {
  // 전체 문제 출력
  async getAllQuestions(): Promise<QuestionDto[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("question")
      .select("id, category_id, content, solution, views, created_at")
      .order("created_at", { ascending: false });

    // 디버깅 로그
    console.log("✅ Supabase Response - getAllQuestions");
    console.log("data:", data);
    console.log("error:", error);

    if (error) {
      console.error("❌ Supabase Error:", error.message);
      throw new Error(error.message);
    }

    if (!data) {
      console.warn("⚠️ Supabase returned no data for 'question' table");
      return [];
    }

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

  // 카테고리별 문제 출력
  async getQuestionsByCategory(categoryId: number): Promise<QuestionDto[]> {
    const supabase = await createClient();
  
    const { data, error } = await supabase
      .from("question")
      .select("id, category_id, content, solution, views, created_at")
      .eq("category_id", categoryId)
      .order("created_at", { ascending: false });
  
    console.log("✅ Supabase Response - getQuestionsByCategory");
    console.log("categoryId:", categoryId);
    console.log("data:", data);
    console.log("error:", error);
  
    if (error) {
      console.error("❌ Supabase Error:", error.message);
      throw new Error(error.message);
    }
  
    if (!data) {
      console.warn(`⚠️ No data found for categoryId ${categoryId}`);
      return [];
    }
  
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
