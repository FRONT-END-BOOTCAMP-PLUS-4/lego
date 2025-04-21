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
  };
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
    const query = supabase
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

    const { data, error } = await query.maybeSingle();
    if (error || !data) {
      console.error("조회 실패:", error);
      throw new Error("문제를 불러오는 데 실패했습니다.");
    }
    const filteredAnswer = data.answer?.find((a) => a.email === userId);
    const isBookmarked = !!data.bookmark?.find((b) => b.email === userId);
    const typedData = data as unknown as QuestionType;

    return new QuestionView(
      typedData.id,
      typedData.category_id,
      typedData.content,
      typedData.solution,
      filteredAnswer?.content ?? "",
      typedData.views ?? 0,
      new Date(typedData.created_at),
      isBookmarked,
      typedData.category?.name ?? ""
    );
  }

  // 전체 문제 출력
  async getAllQuestions(): Promise<QuestionDto[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("question")
      .select("id, category_id, content, solution, views, created_at, bookmark:bookmark(count), answer:answer(count)")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []).map((item: any) => new QuestionDto(
      item.id,
      item.category_id,
      item.content,
      item.solution,
      item.views,
      item.created_at,
      item.bookmark?.[0]?.count ?? 0,
      item.answer?.[0]?.count ?? 0
    ));
  }

  //카테고리별 문제 조회
  async getQuestionsByCategory(categoryId: number): Promise<QuestionDto[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("question")
      .select("id, category_id, content, solution, views, created_at, bookmark:bookmark(count), answer:answer(count)")
      .eq("category_id", categoryId)
      .order("created_at", { ascending: false });

    console.log("✅ Supabase Response - getQuestionsByCategory");
    console.log("categoryId:", categoryId);
    console.log("data:", data);
    console.log("error:", error);

    if (error) {
      console.error(`[getQuestionsByCategory] Supabase Error:`, error.message);
      throw new Error(error.message);
    }

    if (!data) {
      // console.warn(`[getQuestionsByCategory] No data for categoryId ${categoryId}`);
      return [];
    }

    return data.map((item: any) => {
      const bookmarkCount = item.bookmark?.[0]?.count ?? 0;
      const answerCount = item.answer?.[0]?.count ?? 0;
      return new QuestionDto(
        item.id,
        item.category_id,
        item.content,
        item.solution,
        item.views,
        item.created_at,
        bookmarkCount,
        answerCount
      );
    });
  }

  //정렬 조회
  async getAllQuestionsSorted(sortBy: "recent" | "bookmark"): Promise<QuestionDto[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("question")
      .select("id, category_id, content, solution, views, created_at, bookmark:bookmark(count), answer:answer(count)")
      .order(sortBy === "bookmark" ? "bookmark.count" : "created_at", {
        ascending: false,
        foreignTable: sortBy === "bookmark" ? "bookmark" : undefined,
      });

    if (error) throw new Error(error.message);
    return (data ?? []).map((item: any) => new QuestionDto(
      item.id,
      item.category_id,
      item.content,
      item.solution,
      item.views,
      item.created_at,
      item.bookmark?.[0]?.count ?? 0,
      item.answer?.[0]?.count ?? 0
    ));
  }

  //북마크된 사용자별 문제 조회
  async getBookmarkedQuestionsByUser(email: string): Promise<QuestionDto[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("bookmark")
      .select("question:question_id(id, category_id, content, solution, views, created_at, bookmark:bookmark(count), answer:answer(count))")
      .eq("email", email);

    if (error) throw new Error(error.message);

    return (
      data?.map((item: any) => {
        const q = item.question;
        return new QuestionDto(
          q.id,
          q.category_id,
          q.content,
          q.solution,
          q.views,
          q.created_at,
          q.bookmark?.[0]?.count ?? 0,
          q.answer?.[0]?.count ?? 0
        );
      }) ?? []
    );
  }

  // 사용자가 답변한 질문 목록 조회
  async getAnsweredQuestionsByUser(email: string): Promise<QuestionDto[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("answer")
      .select(`
        question:question_id (
          id, category_id, content, solution, views, created_at,
          bookmark:bookmark(count),
          answer:answer(count)
        )
      `)
      .eq("email", email);

    if (error) throw new Error(error.message);

    return (
      data?.map((item: any) => {
        const q = item.question;
        return new QuestionDto(
          q.id,
          q.category_id,
          q.content,
          q.solution,
          q.views,
          q.created_at,
          q.bookmark?.[0]?.count ?? 0,
          q.answer?.[0]?.count ?? 0
        );
      }) ?? []
    );
  }
}