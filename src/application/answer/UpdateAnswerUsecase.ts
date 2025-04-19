import { Answer } from "@/domain/entities/Answer";

import { UpdateAnswerDto } from "./dto/UpdateAnswerDto";
import { AnswerRepository } from "@/domain/repositories/AnswerRepository";

export class UpdateAnswerUsecase {
  constructor(private readonly answerRepo: AnswerRepository) {}

  async execute(updateDto: UpdateAnswerDto): Promise<Answer> {
    const { userId, questionId, content } = updateDto;
    const answer = new Answer(userId, questionId, content);

    return await this.answerRepo.updateAnswer(answer);
  }
}
