import { AnswerView } from "@/domain/entities/AnswerView";
import { AnswerRepository } from "@/domain/repositories/AnswerRepository";

export class GetAnswerListUsecase {
  constructor(private readonly answerRepo: AnswerRepository) {}
  async execute(questionId: number): Promise<AnswerView[]> {
    return await this.answerRepo.getAnswersByQuestion(questionId);
  }
}
