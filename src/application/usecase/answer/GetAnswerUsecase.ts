import { AnswerRepository } from "@/domain/repositories/AnswerRepository";
import { GetAnswerDto } from "./dto/GetAnswerDto";
import { AnswerView } from "@/domain/entities/AnswerView";

export class GetAnswerUsecase {
  constructor(private readonly answerRepo: AnswerRepository) {}
  async execute(answerDto: GetAnswerDto): Promise<AnswerView> {
    return await this.answerRepo.getAnswersByUser(answerDto);
  }
}
