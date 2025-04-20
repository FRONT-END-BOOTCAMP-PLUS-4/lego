import { AnswerRepository } from "@/domain/repositories/AnswerRepository";
import { GetAnswerDto } from "./dto/GetAnswerDto";
import { AnswerView } from "@/domain/entities/AnswerView";

export class GetAnswerUsecase {
  constructor(private readonly answerRepo: AnswerRepository) {}
  async execute(getDto: GetAnswerDto): Promise<AnswerView> {
    const { questionId, question, category, isBookmarked, answer, userId, content } =
      await this.answerRepo.getUserAnswer(getDto);
    return new AnswerView(questionId, question, category, isBookmarked, answer, userId, content);
  }
}
