import { Question } from "../entities/Question";

export interface QuestionRepository {
  //문제 단건 조회
  getQuestion(questionId: number, userId?: string): Promise<Question>;
}
