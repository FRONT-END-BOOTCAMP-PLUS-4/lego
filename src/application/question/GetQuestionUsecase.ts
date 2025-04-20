import { QuestionRepository } from "@/domain/repositories/QuestionRepository";
import { GetQuestionDto } from "./dto/GetQuestionDto";
import { RespondQuestionDto } from "./dto/RespondQuestionDto";
import { Question } from "@/domain/entities/Question";

export class GetQuestionUsecase {
  constructor(private readonly questionRepo: QuestionRepository) {}
  async execute(getDto: GetQuestionDto): Promise<RespondQuestionDto> {
    const { questionId } = getDto;
    const view: Question = await this.questionRepo.getQuestion(questionId);

    return new RespondQuestionDto(
      view.content,
      view.categoryName,
      view.isBookmarked,
      view.solution,
      view.content ?? undefined
    );
  }
}
