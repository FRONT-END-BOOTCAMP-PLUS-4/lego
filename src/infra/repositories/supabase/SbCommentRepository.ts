// infra/repositories/supabase/SbCommentRepository.ts

import { Comment } from "@/domain/entities/Comment";
import { CommentRepository } from "@/domain/repositories/CommentRepository";
import { createClient } from "@/utils/supabase/server";

// Supabase에서 받아온 comment row 타입 명시
type CommentRow = {
  id: number;
  question_id: number;
  answer_email: string;
  content: string;
  created_at: string; // Supabase는 string으로 반환
  email: string;
  username: string;
  avatar_url: string;
};

export class SbCommentRepository implements CommentRepository {
  // 댓글 리스트 출력
  async getByQuestionAndAnswer(questionId: number, answerEmail: string): Promise<Comment[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("comment")
      .select("*")
      .eq("question_id", questionId)
      .eq("answer_email", answerEmail)
      .order("created_at", { ascending: true });

    if (error) throw new Error(error.message);

    return (
      data?.map((item: CommentRow) => new Comment(
        item.id,
        item.question_id,
        item.answer_email,
        item.content,
        new Date(item.created_at),
        item.email,
        item.username,
        item.avatar_url
      )) ?? []
    );
  }

  // 댓글 생성
  async create(comment: Comment): Promise<Comment> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("comment")
      .insert({
        question_id: comment.question_id,
        answer_email: comment.answer_email,
        content: comment.content,
        email: comment.email,
        username: comment.user_name,
        avatar_url: comment.avatar_url,
        created_at: comment.createdAt.toISOString(),
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    const item: CommentRow = data;

    return new Comment(
      item.id,
      item.question_id,
      item.answer_email,
      item.content,
      new Date(item.created_at),
      item.email,
      item.username,
      item.avatar_url
    );
  }

  // 댓글 수정
  async updateContent(id: number, content: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase
      .from("comment")
      .update({ content })
      .eq("id", id);

    if (error) throw new Error(error.message);
  }

  // 댓글 삭제
  async delete(id: number): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase
      .from("comment")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);
  }
}
