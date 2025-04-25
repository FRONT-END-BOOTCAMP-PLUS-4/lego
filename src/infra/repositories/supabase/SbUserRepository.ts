import { UserRepository } from "@/domain/repositories/UserRepository";
import { createClient } from "@/utils/supabase/server";
import { UserActivity } from "@/domain/entities/UserActivity";
import { UserAnswer } from "@/domain/entities/UserAnswer";
import { UserBookmark } from "@/domain/entities/UserBookmark";
import { UserLikedAnswer } from "@/domain/entities/UserLike";
import { UserComment } from "@/domain/entities/UserComment";

interface AnswerRow {
  created_at: string;
}

interface AnswerWithQuestionRow {
  question_id: number;
  content: string;
  created_at: string;
  question: {
    content: string;
    category: { name: string }[];
  };
}

interface BookmarkRow {
  question: {
    id: number;
    content: string;
    category: { image_url: string };
  };
}

interface LikeAnswerRow {
  answer: {
    question_id: number;
    content: string;
    username: string;
    email: string;
    avatar_url: string;
    created_at: string;
  };
}

interface CommentRow {
  content: string;
  answer_email: string;
  question_id: number;
  question: { content: string }[];
}

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

    if (dateError || !data) throw new Error("일별 활동 조회 실패");

    const typedData = data as AnswerRow[];

    const dateMap: Record<string, number> = {};
    typedData.forEach((item) => {
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

    if (error || !data) throw new Error("답변 조회 실패");

    const typedData = data as unknown as AnswerWithQuestionRow[];

    const result: UserAnswer[] = [];

    for (const row of typedData) {
      const categoryName = row.question.category?.[0]?.name ?? "카테고리 없음";

      const { count } = await supabase
        .from("like")
        .select("*", { count: "exact", head: true })
        .eq("question_id", row.question_id)
        .eq("answer_email", email);

      result.push(
        new UserAnswer(
          row.question_id,
          categoryName,
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

    if (error || !data) throw new Error("북마크 조회 실패");

    const typedData = data as unknown as BookmarkRow[];

    return typedData.map((row) => {
      return new UserBookmark(
        row.question.id,
        row.question.content,
        row.question.category.image_url
      );
    });
  }

  async getUserLikedAnswers(email: string): Promise<UserLikedAnswer[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("like")
      .select(
        `
        answer:answer (
          question_id,
          content,
          username,
          email,
          avatar_url,
          created_at
        )
      `
      )
      .eq("like_email", email);

    if (error || !data) throw new Error("좋아요한 답변 조회 실패");

    const typedData = data as unknown as LikeAnswerRow[];

    return typedData.map((row) => {
      const a = row.answer;
      return new UserLikedAnswer(
        a.question_id,
        a.content,
        a.username,
        a.email,
        a.avatar_url,
        a.created_at
      );
    });
  }

  async getUserComments(email: string): Promise<UserComment[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("comment")
      .select(
        `
        content,
        answer_email,
        question_id,
        question:question (
          content
        )
      `
      )
      .eq("email", email);

    if (error || !data) throw new Error("댓글 조회 실패");

    const typedData = data as CommentRow[];

    return typedData.map((row) => {
      const questionContent = row.question?.[0]?.content ?? "질문 없음";
      return new UserComment(row.question_id, questionContent, row.content, row.answer_email);
    });
  }
}
