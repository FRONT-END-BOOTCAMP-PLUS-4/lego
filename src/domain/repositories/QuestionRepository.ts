import { QuestionDto } from "@/application/usecase/question/dto/QuestionDto";
import { QuestionView } from "../entities/QuestionView";

export interface QuestionRepository {
  //문제 단건 조회
  getQuestion(questionId: number, userId: string | undefined): Promise<QuestionView>;

  getAllQuestions(): Promise<QuestionDto[]>;//전체 문제 조회
  getQuestionsByCategory(categoryId: number): Promise<QuestionDto[]>;//카테고리별 문제 조회
  getAllQuestionsSorted(sortBy: "recent" | "bookmark"): Promise<QuestionDto[]>;//문제 정렬
  getBookmarkedQuestionsByUser(userId: string): Promise<QuestionDto[]>; // 🔥 북마크된 문제 조회
  getAnsweredQuestionsByUser(userId: string): Promise<QuestionDto[]>;//         답변한 문제 조회
}
