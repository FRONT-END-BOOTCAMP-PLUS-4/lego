// infra/repositories/supabase/SbCommentRepository.ts

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
}
