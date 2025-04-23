import { Answer } from "@/domain/entities/Answer";
import { AnswerView } from "@/domain/entities/AnswerView";
import { AnswerRepository } from "@/domain/repositories/AnswerRepository";
import { createClient } from "@/utils/supabase/server";

interface UserAnswerParams {
  userId: string | null;
  questionId: number;
}

interface answerType {
  email: string;
  question_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  avatar_url: string;
  username: string;
  question?: { content: string; category: { name: string }[] };
  like: { like_email: string }[];
}

export class SbAnswerRepository implements AnswerRepository {
  //답변 저장
  async createAnswer(answer: Answer): Promise<Answer> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("answer")
      .insert([
        {
          email: answer.userId,
          question_id: answer.questionId,
          content: answer.content,
          username: answer.userName,
          avatar_url: answer.avatarUrl,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("답변 저장 실패:", error);
      throw new Error("답변 저장 실패.");
    }
    return data;
  }

  //답변 수정
  //특정 userId와 questionId 조합을 가진 답변 content 수정
  async updateAnswer(answer: Answer): Promise<Answer> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("answer")
      .update({ content: answer.content, updated_at: new Date().toISOString() })
      .eq("email", answer.userId)
      .eq("question_id", answer.questionId)
      .select()
      .single();
    if (error) {
      console.error("답변 수정 실패:", error);
      throw new Error("답변 수정 실패.");
    }
    return data;
  }

  //답변 삭제
  async deleteAnswer(params: UserAnswerParams): Promise<void> {
    const supabase = await createClient();
    const { userId, questionId } = params;
    const { error } = await supabase
      .from("answer")
      .delete()
      .eq("email", userId)
      .eq("question_id", questionId);

    if (error) {
      console.error("답변 삭제 실패:", error);
      throw new Error("답변 삭제에 실패했습니다.");
    }
  }

  //특정 문제의 답변 리스트 조회
  async getAnswersByQuestion(params: UserAnswerParams): Promise<AnswerView[]> {
    const supabase = await createClient();
    const { userId, questionId } = params;
    const { data, error } = await supabase
      .from("answer")
      .select(
        `
      email,
      question_id,
      content,
      created_at,
      updated_at,
      avatar_url,
      username,
      question:question_id(
        content,
        category:category_id(
        name
        )
      ),
      like:like(like_email)
    `
      )
      .eq("question_id", questionId)
      .neq("email", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("답변 리스트 조회 실패:", error);
      throw new Error("답변을 불러오지 못했습니다.");
    }

    const result: AnswerView[] = (data ?? []).map((row) => {
      return new AnswerView(
        row.email,
        row.content,
        row.created_at,
        row.avatar_url,
        row.username,
        row.like?.length ?? 0,
        row.question_id,
        row.question?.category?.[0]?.name,
        row.question?.content,
        row.like?.some((l) => l.like_email === userId) ?? false
      );
    });

    return result;
  }

  //특정 유저의 특정 답변 상세 조회
  async getAnswersByUser(params: UserAnswerParams): Promise<AnswerView> {
    const supabase = await createClient();
    const { userId, questionId } = params;
    const { data, error } = await supabase
      .from("answer")
      .select(
        `
      email,
      content,
      created_at,
      avatar_url,
      username,
      question:question_id(
        content,
        category:category_id(
        name
        )
      ),
      like:like(like_email)
    `
      )
      .eq("question_id", questionId)
      .eq("email", userId)
      .single();

    if (error) {
      console.error("답변 조회 실패:", error);
      throw new Error("답변을 불러오지 못했습니다.");
    }
    const typedData = data as unknown as answerType;
    return new AnswerView(
      typedData.email,
      typedData.content,
      typedData.created_at,
      typedData.avatar_url,
      typedData.username,
      typedData.like?.length ?? 0,
      typedData.question_id,
      typedData.question?.category?.[0]?.name,
      typedData.question?.content,
      typedData.like?.some((l) => l.like_email === userId) ?? false
    );
  }
}
