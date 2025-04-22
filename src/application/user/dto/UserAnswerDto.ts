import { UserAnswer } from "@/domain/entities/UserAnswer";

export class UserAnswerDto {
  constructor(
    public readonly questionId: number,
    public readonly categoryName: string,
    public readonly questionTitle: string,
    public readonly answerContent: string,
    public readonly createdAt: string,
    public readonly likeCount: number
  ) {}

  static fromEntity(entity: UserAnswer): UserAnswerDto {
    return new UserAnswerDto(
      entity.questionId,
      entity.categoryName,
      entity.questionTitle,
      entity.answerContent,
      entity.createdAt,
      entity.likeCount
    );
  }
}
