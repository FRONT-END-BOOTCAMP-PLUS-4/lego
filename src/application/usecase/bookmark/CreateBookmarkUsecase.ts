import { BookmarkRepository } from "@/domain/repositories/BookmarkRepository";
import { CreateBookmarkDto } from "./dto/CreateBookmarkDto";
import { Bookmark } from "@/domain/entities/Bookmark";

export class CreateBookmarkUsecase {
  constructor(private bookmarkRepo: BookmarkRepository) {}
  async execute(createDto: CreateBookmarkDto): Promise<Bookmark> {
    const bookmark: Bookmark = await this.bookmarkRepo.createBookmark(createDto);
    return bookmark;
  }
}
