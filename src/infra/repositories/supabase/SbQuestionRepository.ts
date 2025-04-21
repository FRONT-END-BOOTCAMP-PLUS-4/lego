import { QuestionDto } from "@/application/usecase/question/dto/QuestionDto";
import { QuestionView } from "@/domain/entities/QuestionView";
import { QuestionRepository } from "@/domain/repositories/QuestionRepository";
import { createClient } from "@/utils/supabase/server";

type QuestionType = {
  id: number;
  content: string;
  solution: string;
  category_id: number;
  views: number;
  created_at: string;
  answer?: {
    email: string;
    content: string;
    created_at: string;
  }[];
  bookmark?: {
    email: string;
  }[];
  category: {
    name: string;
    image_url: string;
  };
};

export class SbQuestionRepository implements QuestionRepository {
  //특정 유저의 특정 답변 조회
  //question 조회
  async getQuestion(questionId: number, userId?: string): Promise<QuestionView> {
    const supabase = await createClient();
    let query = supabase
      .from("question")
      .select(
        `
      id,
      content,
      solution,
      category_id,
      views,
      created_at,
      answer:answer (
        email,
        content,
        created_at
      ),
      bookmark:bookmark (
        email
      ),
      category:category_id (
        name,
        image_url
      )
    `
      )
      .eq("id", questionId)
      .eq("answer.email", userId)
      .eq("bookmark.email", userId);

    const { data, error } = await query.maybeSingle();

    if (error || !data) {
      console.error("조회 실패:", error);
      throw new Error("문제를 불러오는 데 실패했습니다.");
    }
    const typedData = data as unknown as QuestionType;

    return new QuestionView(
      typedData.id,
      typedData.category_id,
      typedData.content,
      typedData.solution,
      typedData.answer?.[0]?.content ?? "",
      typedData.views ?? 0,
      new Date(typedData.created_at),
      !!typedData.bookmark?.[0],
      typedData.category?.name ?? ""
    );
  }

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
