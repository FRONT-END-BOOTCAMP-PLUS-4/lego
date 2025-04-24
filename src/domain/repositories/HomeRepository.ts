import { HomePopularQuestion } from "@/domain/entities/HomePopularQuestion";
import { HomePopularAnswer } from "@/domain/entities/HomePopularAnswer";

export interface HomeRepository {
  getPopularQuestions(): Promise<HomePopularQuestion[]>;
  getPopularAnswers(): Promise<HomePopularAnswer[]>;
}
