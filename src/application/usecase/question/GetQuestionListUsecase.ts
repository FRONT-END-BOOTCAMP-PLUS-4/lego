import { QuestionRepository } from "@/domain/repositories/QuestionRepository";
import { QuestionDto } from "./dto/QuestionDto";

export class GetQuestionListUsecase {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute(
    categoryId?: number,
    sortBy: "recent" | "bookmark" = "recent",
    email?: string, // ✅ userId → email
    filter: "bookmarked" | "answered" | "all" = "all"
  ): Promise<QuestionDto[]> {
    let questions: QuestionDto[];

    // ✅ email 기반 북마크 필터 처리
    if (filter === "bookmarked" && email) {
      questions = await this.questionRepository.getBookmarkedQuestionsByUser(email);
    }

     // ✅ answered 필터 추가
    else if (filter === "answered" && email) {
        return await this.questionRepository.getAnsweredQuestionsByUser(email);
    }

    // 카테고리별 조회
    else if (categoryId) {
      questions = await this.questionRepository.getQuestionsByCategory(categoryId);
    }
    // 전체 조회
    else {
      questions = await this.questionRepository.getAllQuestions();
    }

    // 정렬 처리
    if (sortBy === "bookmark") {
      questions.sort((a, b) => b.bookmark_count - a.bookmark_count);
    }

    return questions;
  }
}