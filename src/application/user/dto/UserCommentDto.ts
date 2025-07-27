import { UserComment } from "@/domain/entities/UserComment";

export class UserCommentDto {
  constructor(
    public readonly questionId: number,
    public readonly questionTitle: string,
    public readonly commentContent: string,
    public readonly answerAuthorEmail: string
  ) {}

  static fromEntity(entity: UserComment): UserCommentDto {
    return new UserCommentDto(
      entity.questionId,
      entity.questionTitle,
      entity.commentContent,
      entity.answerAuthorEmail
    );
  }
}
