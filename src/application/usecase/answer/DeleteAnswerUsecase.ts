import { AnswerRepository } from "@/domain/repositories/AnswerRepository";

export class DeleteAnswerUsecase {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute(dto: { userId: string; questionId: number }): Promise<void> {
    const { userId, questionId } = dto;

    await this.answerRepository.deleteAnswer({ userId, questionId });
  }
}
