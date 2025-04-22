import { CreateBookmarkDto } from "@/application/usecase/bookmark/dto/CreateBookmarkDto";
import { DeleteBookmarkrDto } from "@/application/usecase/bookmark/dto/DeleteBookmarkDto";
import { Bookmark } from "@/domain/entities/Bookmark";
import { BookmarkRepository } from "@/domain/repositories/BookmarkRepository";
import { createClient } from "@/utils/supabase/server";

export class SbBookmarkRepository implements BookmarkRepository {
  async createBookmark(params: CreateBookmarkDto): Promise<Bookmark> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("bookmark")
      .insert([{ email: params.userId, question_id: params.questionId }])
      .select()
      .single();

    if (error || !data) {
      console.error("Supabase error:", error);
      throw new Error("북마크 등록 실패");
    }
    return data;
  }

  async deleteBookmark(params: DeleteBookmarkrDto): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
      .from("bookmark")
      .delete()
      .eq("email", params.userId)
      .eq("question_id", params.questionId);

    if (error) {
      throw new Error(`북마크 해제 실패: ${error.message}`);
    }
  }
}
