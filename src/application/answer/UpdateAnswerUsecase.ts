import { Answer } from "@/domain/entities/Answer";

import { UpdateAnswerDto } from "./dto/UpdateAnswerDto";
import { AnswerRepository } from "@/domain/repositories/AnswerRepository";

export class UpdateAnswerUsecase {
  constructor(private readonly answerRepo: AnswerRepository) {}

  async execute(updateDto: UpdateAnswerDto): Promise<Answer> {
    const answer = new Answer(
      updateDto.userId,
      updateDto.questionId,
      updateDto.content,
      new Date()
    );

    return await this.answerRepo.updateAnswer(answer);
  }
}
