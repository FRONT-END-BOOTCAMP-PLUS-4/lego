import { QuestionRepository } from "@/domain/repositories/QuestionRepository";
import { GetQuestionDto } from "./dto/GetQuestionDto";
import { QuestionView } from "@/domain/entities/QuestionView";

export class GetQuestionUsecase {
  constructor(private readonly questionRepo: QuestionRepository) {}
  async execute(getDto: GetQuestionDto): Promise<QuestionView> {
    const { questionId, userId } = getDto;
    const view: QuestionView = await this.questionRepo.getQuestion(questionId, userId);
    return view;
  }
}
