import { UserRepository } from "@/domain/repositories/UserRepository";
import { createClient } from "@/utils/supabase/server";
import { UserActivity } from "@/domain/entities/UserActivity";
import { UserAnswer } from "@/domain/entities/UserAnswer";
import { UserBookmark } from "@/domain/entities/UserBookmark";

export class SbUserRepository implements UserRepository {
  async getUserActivity(email: string): Promise<UserActivity> {
    const supabase = await createClient();

    const { count, error: countError } = await supabase
      .from("answer")
      .select("question_id", { count: "exact", head: true })
      .eq("email", email);

    if (countError) throw new Error("총 답변 수 조회 실패");

    const { data, error: dateError } = await supabase
      .from("answer")
      .select("created_at")
      .eq("email", email);

    if (dateError) throw new Error("일별 활동 조회 실패");

    const dateMap: Record<string, number> = {};
    data.forEach((item) => {
      const date = new Date(item.created_at).toISOString().split("T")[0];
      dateMap[date] = (dateMap[date] || 0) + 1;
    });

    const activeDays = Object.keys(dateMap).length;
    const dailyActivity = Object.entries(dateMap).map(([date, count]) => ({ date, count }));

    return new UserActivity(email, count ?? 0, activeDays, dailyActivity);
  }

  async getUserAnswers(email: string): Promise<UserAnswer[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("answer")
      .select(
        `
        question_id,
        content,
        created_at,
        question:question (
          content,
          category:category (
            name
          )
        )
      `
      )
      .eq("email", email)
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("Supabase 오류: ", error);
      throw new Error("답변 조회 실패");
    }

    const result: UserAnswer[] = [];

    for (const row of data) {
      const { count } = await supabase
        .from("like")
        .select("*", { count: "exact", head: true })
        .eq("question_id", row.question_id)
        .eq("answer_email", email);

      result.push(
        new UserAnswer(
          row.question_id,
          row.question.category.name,
          row.question.content,
          row.content,
          row.created_at,
          count ?? 0
        )
      );
    }

    return result;
  }

  async getUserBookmarks(email: string): Promise<UserBookmark[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("bookmark")
      .select(
        `
        question:question (
          id,
          content,
          category:category (
            image_url
          )
        )
      `
      )
      .eq("email", email);

    if (error || !data) {
      console.error("북마크 조회 오류: ", error);
      throw new Error("북마크 조회 실패");
    }

    return data.map((row) => {
      return new UserBookmark(
        row.question.id,
        row.question.content,
        row.question.category.image_url
      );
    });
  }
}
