import { UserRepository } from "@/domain/repositories/UserRepository";
import { UserLikedAnswerDto } from "@/application/user/dto/UserLikedAnswerDto";

export class GetUserLikedAnswersUsecase {
  constructor(private readonly repository: UserRepository) {}

  async execute(email: string): Promise<UserLikedAnswerDto[]> {
    return this.repository.getUserLikedAnswers(email);
  }
}
