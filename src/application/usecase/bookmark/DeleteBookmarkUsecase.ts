import { BookmarkRepository } from "@/domain/repositories/BookmarkRepository";
import { DeleteBookmarkrDto } from "./dto/DeleteBookmarkDto";

export class DeleteBookmarkUsecase {
  constructor(private bookmarkRepo: BookmarkRepository) {}
  async execute(deleteDto: DeleteBookmarkrDto): Promise<void> {
    return await this.bookmarkRepo.deleteBookmark(deleteDto);
  }
}
