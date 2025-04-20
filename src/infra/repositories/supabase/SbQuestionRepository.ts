import { Question } from "@/domain/entities/Question";
import { QuestionRepository } from "@/domain/repositories/QuestionRepository";
import { supabase } from "@/utils/supabase/server";

type QuestionParams = {
  questionId: number;
  userId: string | null;
};
type QuestionType = {
  id: number;
  content: string;
  solution: string;
  category_id: number;
  answer: {
    email: string;
    content: string;
    created_at: string;
  }[];
  bookmark: {
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
    return new Question(
      data.id,
      data.category_id,
      data.content,
      data.solution,
      data.answer?.[0]?.content ?? "",
      data.views ?? 0,
      new Date(data.created_at),
      !!data.bookmark?.[0],
      data.category?.[0]?.name
    );
  }
}
