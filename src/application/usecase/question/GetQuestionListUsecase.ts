import { QuestionRepository } from "@/domain/repositories/QuestionRepository";
import { QuestionDto } from "./dto/QuestionDto";

export class GetQuestionListUsecase {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute(
    categoryId?: number,
    sortBy: "recent" | "bookmark" = "recent"
  ): Promise<QuestionDto[]> {
    let questions: QuestionDto[];

    if (categoryId) {
      questions = await this.questionRepository.getQuestionsByCategory(categoryId);
    } else {
      questions = await this.questionRepository.getAllQuestions();
    }

    // 정렬 처리
    if (sortBy === "bookmark") {
      questions.sort((a, b) => b.bookmark_count - a.bookmark_count);
    }

    return questions;
  }
}