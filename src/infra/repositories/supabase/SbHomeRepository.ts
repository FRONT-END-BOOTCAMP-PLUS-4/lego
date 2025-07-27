import { createClient } from "@/utils/supabase/server";
import { HomeRepository } from "@/domain/repositories/HomeRepository";
import { HomePopularQuestion } from "@/domain/entities/HomePopularQuestion";
import { HomePopularAnswer } from "@/domain/entities/HomePopularAnswer";

interface QuestionWithCategory {
  content: string;
  category: { name: string };
}

type QuestionWithCount = QuestionWithCategory & { count: number };

interface AnswerWithQuestion {
  content: string;
  username: string;
  question_id: number;
  email: string;
  question: { content: string };
}

type AnswerWithCount = AnswerWithQuestion & { count: number };

export class SbHomeRepository implements HomeRepository {
  async getPopularQuestions(): Promise<HomePopularQuestion[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("bookmark").select(
      `
        question_id,
        question:question (
          content,
          category:category (
            name
          )
        )
      `
    );

    if (error || !data) throw new Error("북마크 인기 질문 조회 실패");

    const counts = data.reduce<Record<number, QuestionWithCount>>((acc, cur) => {
      const qid = cur.question_id;
      const question = cur.question as unknown as QuestionWithCategory;

      if (!acc[qid]) acc[qid] = { ...question, count: 1 };
      else acc[qid].count += 1;

      return acc;
    }, {});

    return Object.entries(counts)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 4)
      .map(([qid, q]) => new HomePopularQuestion(+qid, q.content, q.category.name, q.count));
  }

  async getPopularAnswers(): Promise<HomePopularAnswer[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("like").select(
      `
        answer:answer (
          content,
          username,
          question_id,
          email,
          question:question (
            content
          )
        )
      `
    );

    if (error || !data) throw new Error("좋아요 인기 답변 조회 실패");

    const counts = data.reduce<Record<string, AnswerWithCount>>((acc, cur) => {
      const answer = cur.answer as unknown as AnswerWithQuestion;
      const content = answer.content;

      if (!acc[content]) acc[content] = { ...answer, count: 1 };
      else acc[content].count += 1;

      return acc;
    }, {});

    return Object.values(counts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 2)
      .map(
        (a) =>
          new HomePopularAnswer(a.question_id, a.content, a.question.content, a.username, a.email)
      );
  }
}
