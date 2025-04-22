import { UserRepository } from "@/domain/repositories/UserRepository";
import { UserAnswerDto } from "@/application/user/dto/UserAnswerDto";

export class GetUserAnswersUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<UserAnswerDto[]> {
    const answers = await this.userRepository.getUserAnswers(email);
    return answers.map(UserAnswerDto.fromEntity);
  }
}
