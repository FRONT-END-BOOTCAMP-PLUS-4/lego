import { QuestionRepository } from "@/domain/repositories/QuestionRepository";
import { GetQuestionDto } from "./dto/GetQuestionDto";
import { Question } from "@/domain/entities/Question";

export class GetQuestionUsecase {
  constructor(private readonly questionRepo: QuestionRepository) {}
  async execute(getDto: GetQuestionDto): Promise<Question> {
    const { questionId } = getDto;
    const view: Question = await this.questionRepo.getQuestion(questionId);
    return view;
  }
}
