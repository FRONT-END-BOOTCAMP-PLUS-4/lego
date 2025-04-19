import { Answer } from "@/domain/entities/Answer";

import { AnswerRepository } from "@/domain/repositories/AnswerRepository";
import { supabase } from "@/utils/supabase/server";

interface UserAnswerParams {
  userId: string;
  questionId: number;
}

export class SbAnswerRepository implements AnswerRepository {
  //답변 저장
  async createAnswer(answer: Answer): Promise<Answer> {
    const { data, error } = await supabase
      .from("answer")
      .insert([
        {
          email: answer.userId,
          question_id: answer.questionId,
          content: answer.content,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("답변 저장 실패:", error);
      throw new Error("답변 저장 실패.");
    }

    return {
      userId: data.email,
      questionId: data.question_id,
      content: data.content,
      createdAt: new Date(data.created_at),
    };
  }

  //답변 수정
  //특정 userId와 questionId 조합을 가진 답변 content 수정
  async updateAnswer(answer: Answer): Promise<Answer> {
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
    return {
      userId: data.email,
      questionId: data.question_id,
      content: data.content,
    };
  }

  //답변 삭제
  async deleteAnswer(params: UserAnswerParams): Promise<void> {
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

  //특정 유저의 특정 답변 조회
  async findUserAnswer(params: UserAnswerParams): Promise<AnswerView> {}

  //특정 문제의 답변 리스트 조회
  async findAnswersByQuestion(params: UserAnswerParams): Promise<Answer[]> {
    const { questionId } = params;
    const { data, error } = await supabase
      .from("answer")
      .select("*")
      .eq("question_id", questionId)
      .order("created_at", { ascending: false }); // 최신순 정렬

    if (error) {
      console.error("답변 리스트 조회 실패:", error);
      throw new Error("답변을 불러오지 못했습니다.");
    }

    if (!data) return [];

    return data.map(
      (item) => new Answer(item.user_id, item.question_id, item.content, new Date(item.created_at))
    );
  }

  //특정 유저의 답변 리스트 조회
  async findAllAnswersByUser(userId: number): Promise<Answer[]> {
    const { data, error } = await supabase.from("answer").select("*").eq("user_id", userId);
    if (error) {
      console.error("답변 조회 실패:", error);
      throw new Error("답변을 불러오지 못했습니다.");
    }

    if (!data) return [];

    return data.map(
      (item) => new Answer(item.user_id, item.question_id, item.content, new Date(item.created_at))
    );
  }
}
