// infra/repositories/supabase/SbCommentRepository.ts

import { Comment } from "@/domain/entities/Comment";
import { CommentRepository } from "@/domain/repositories/CommentRepository";
import { createClient } from "@/utils/supabase/server";

export class SbCommentRepository implements CommentRepository {

  //댓글 개수 출력
  async countByQuestionAndAnswer(questionId: number, answerEmail: string): Promise<number> {
    const supabase = await createClient();

    const { count, error } = await supabase.from("comment")
      .select("*", { count: "exact", head: true })
      .eq("question_id", questionId)
      .eq("answer_email", answerEmail);

    if (error) throw new Error(error.message);
    return count ?? 0;
  }

  //댓글 리스트 출력
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
      data?.map((item: any) => new Comment(
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

  //댓글 생성
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
      .single(); // ✅ 삽입된 레코드 반환

    if (error) throw new Error(error.message);

    return new Comment(
      data.id,
      data.question_id,
      data.answer_email,
      data.content,
      new Date(data.created_at),
      data.email,
      data.username,
      data.avatar_url
    );
  }

  //댓글 수정
  async updateContent(id: number, content: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase
      .from("comment")
      .update({ content })
      .eq("id", id);

    if (error) throw new Error(error.message);
  }
}
