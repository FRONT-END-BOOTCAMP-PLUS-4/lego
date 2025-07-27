import { UserBookmark } from "@/domain/entities/UserBookmark";

export class UserBookmarkDto {
  constructor(
    public readonly questionId: number,
    public readonly questionTitle: string,
    public readonly categoryImageUrl: string
  ) {}

  static fromEntity(entity: UserBookmark): UserBookmarkDto {
    return new UserBookmarkDto(entity.questionId, entity.questionTitle, entity.categoryImageUrl);
  }
}
