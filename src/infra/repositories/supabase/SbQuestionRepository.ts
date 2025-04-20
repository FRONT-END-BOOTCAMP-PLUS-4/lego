import { Question } from "@/domain/entities/Question";
import { QuestionRepository } from "@/domain/repositories/QuestionRepository";
import { supabase } from "@/utils/supabase/server";

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
  async getQuestion(questionId: number, userId?: string): Promise<Question> {
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
      .eq("id", questionId);
    if (userId) {
      query = query.eq("answer.email", userId).eq("bookmark.email", userId);
    }

    const { data, error } = await query.maybeSingle();

    if (error || !data) {
      console.error("조회 실패:", error);
      throw new Error("문제를 불러오는 데 실패했습니다.");
    }
    const typedData = data as unknown as QuestionType;

    return new Question(
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
}
