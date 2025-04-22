import { BookmarkRepository } from "@/domain/repositories/BookmarkRepository";
import { DeleteBookmarkrDto } from "./dto/DeleteBookmarkDto";
import { Bookmark } from "@/domain/entities/Bookmark";

export class DeleteBookmarkUsecase {
  constructor(private bookmarkRepo: BookmarkRepository) {}
  async execute(deleteDto: DeleteBookmarkrDto): Promise<Bookmark> {
    const bookmark: Bookmark = await this.bookmarkRepo.deleteBookmark(deleteDto);
    return bookmark;
  }
}
