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
}
