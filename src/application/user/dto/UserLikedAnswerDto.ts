import { UserLikedAnswer } from "@/domain/entities/UserLike";

export class UserLikedAnswerDto {
  constructor(
    public readonly questionId: number,
    public readonly answerContent: string,
    public readonly answerAuthor: string,
    public readonly createdAt: string
  ) {}

  static fromEntity(entity: UserLikedAnswer): UserLikedAnswerDto {
    return new UserLikedAnswerDto(
      entity.questionId,
      entity.answerContent,
      entity.answerAuthor,
      entity.createdAt
    );
  }
}
