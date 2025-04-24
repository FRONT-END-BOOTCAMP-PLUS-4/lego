import { createClient } from "@/utils/supabase/server";
import { HomeRepository } from "@/domain/repositories/HomeRepository";
import { HomePopularQuestion } from "@/domain/entities/HomePopularQuestion";
import { HomePopularAnswer } from "@/domain/entities/HomePopularAnswer";

export class SbHomeRepository implements HomeRepository {
  async getPopularQuestions(): Promise<HomePopularQuestion[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("bookmark")
      .select(
        `
        question_id,
        question:question (
          content,
          category:category (
            name
          )
        )
      `
      )
      .limit(10)
      .order("question_id", { ascending: false });

    if (error || !data) throw new Error("북마크 인기 질문 조회 실패");

    const counts = data.reduce(
      (acc, cur) => {
        const qid = cur.question_id;
        if (!acc[qid]) acc[qid] = { ...cur.question, count: 1 };
        else acc[qid].count += 1;
        return acc;
      },
      {} as Record<number, any>
    );

    return Object.entries(counts)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 4)
      .map(([qid, q]: any) => new HomePopularQuestion(+qid, q.content, q.category.name, q.count));
  }

  async getPopularAnswers(): Promise<HomePopularAnswer[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("like")
      .select(
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
      )
      .limit(10);

    if (error || !data) throw new Error("좋아요 인기 답변 조회 실패");

    const counts = data.reduce(
      (acc, cur) => {
        const content = cur.answer.content;
        if (!acc[content]) acc[content] = { ...cur.answer, count: 1 };
        else acc[content].count += 1;
        return acc;
      },
      {} as Record<string, any>
    );

    return Object.values(counts)
      .sort((a: any, b: any) => b.count - a.count)
      .slice(0, 2)
      .map(
        (a: any) =>
          new HomePopularAnswer(a.question_id, a.content, a.question.content, a.username, a.email)
      );
  }
}
