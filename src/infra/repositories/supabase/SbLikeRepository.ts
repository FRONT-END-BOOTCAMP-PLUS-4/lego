import { CreateLikeDto } from "@/application/usecase/like/dto/CreateLikeDto";
import { DeleteLikeDto } from "@/application/usecase/like/dto/DeleteLikeDto";
import { Like } from "@/domain/entities/Like";
import { LikeRepository } from "@/domain/repositories/LikeRepository";
import { createClient } from "@/utils/supabase/server";

export class SbLikeRepository implements LikeRepository {
  async createLike(params: CreateLikeDto): Promise<Like> {
    const supabase = await createClient();
    const { questionId, answerEmail, userId } = params;
    const { data, error } = await supabase
      .from("like")
      .insert([
        {
          question_id: questionId,
          answer_email: decodeURIComponent(answerEmail),
          like_email: userId,
        },
      ])
      .select()
      .single();

    if (error || !data) {
      console.error("Supabase error:", error);
      throw new Error("좋아요 요청 실패");
    }
    console.log(data);
    return data;
  }

  async deleteLike(params: DeleteLikeDto): Promise<void> {
    const supabase = await createClient();
    const { questionId, answerEmail, userId } = params;
    const { error } = await supabase
      .from("like")
      .delete()
      .eq("question_id", questionId)
      .eq("answer_email", decodeURIComponent(answerEmail))
      .eq("like_email", userId);
    if (error) {
      throw new Error(`좋아요 취소 실패: ${error.message}`);
    }
  }
}
