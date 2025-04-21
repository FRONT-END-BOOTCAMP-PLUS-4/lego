import { QuestionDto } from "@/application/usecase/question/dto/QuestionDto";
import { QuestionView } from "../entities/QuestionView";
export interface QuestionRepository {
  //전체 문제 리스트 출력
  getAllQuestions(): Promise<QuestionDto[]>;

  //특정 카테고리 문제리스트 출력
  getQuestionsByCategory(categoryId: number): Promise<QuestionDto[]>;

  //문제 단건 조회
  getQuestion(questionId: number, userId?: string): Promise<QuestionView>;
}
