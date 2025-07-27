import { AnswerView } from "@/domain/entities/AnswerView";
import { AnswerRepository } from "@/domain/repositories/AnswerRepository";
import { GetAnswerDto } from "./dto/GetAnswerDto";

export class GetAnswerListUsecase {
  constructor(private readonly answerRepo: AnswerRepository) {}
  async execute(answerDto: GetAnswerDto): Promise<AnswerView[]> {
    return await this.answerRepo.getAnswersByQuestion(answerDto);
  }
}
