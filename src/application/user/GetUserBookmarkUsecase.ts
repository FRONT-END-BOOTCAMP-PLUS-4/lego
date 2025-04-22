import { UserRepository } from "@/domain/repositories/UserRepository";
import { UserBookmarkDto } from "@/application/user/dto/UserBookmarkDto";

export class GetUserBookmarksUsecase {
  constructor(private readonly repository: UserRepository) {}

  async execute(email: string): Promise<UserBookmarkDto[]> {
    const bookmarks = await this.repository.getUserBookmarks(email);
    return bookmarks.map(UserBookmarkDto.fromEntity);
  }
}
