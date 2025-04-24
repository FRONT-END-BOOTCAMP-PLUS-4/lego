import { HomeRepository } from "@/domain/repositories/HomeRepository";
import { HomePopularAnswer } from "@/domain/entities/HomePopularAnswer";
import { HomePopularQuestion } from "@/domain/entities/HomePopularQuestion";

export class GetHomeDataUsecase {
  constructor(private readonly repository: HomeRepository) {}

  async execute(): Promise<{
    popularQuestions: HomePopularQuestion[];
    popularAnswers: HomePopularAnswer[];
  }> {
    const [questions, answers] = await Promise.all([
      this.repository.getPopularQuestions(),
      this.repository.getPopularAnswers(),
    ]);

    return {
      popularQuestions: questions,
      popularAnswers: answers,
    };
  }
}
