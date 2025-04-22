import { CreateBookmarkDto } from "@/application/usecase/bookmark/dto/CreateBookmarkDto";
import { Bookmark } from "../entities/Bookmark";
import { DeleteBookmarkrDto } from "@/application/usecase/bookmark/dto/DeleteBookmarkDto";

export interface BookmarkRepository {
  //문제 저장
  createBookmark(bookmark: CreateBookmarkDto): Promise<Bookmark>;

  //문제 북마크 삭제
  deleteBookmark(bookmark: DeleteBookmarkrDto): Promise<void>;
}
