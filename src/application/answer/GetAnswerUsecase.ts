import { AnswerRepository } from "@/domain/repositories/AnswerRepository";
import { GetAnswerDto } from "./dto/GetAnswerDto";
import { RespondAnswerDto } from "./dto/RespondAnswerDto";
import { AnswerView } from "@/domain/entities/AnswerView";

export class GetAnswerUsecase {
  constructor(private readonly answerRepo: AnswerRepository) {}
  async execute(getDto: GetAnswerDto): Promise<RespondAnswerDto> {
    const { userId, questionId } = getDto;
    const answerView: AnswerView = await this.answerRepo.getUserAnswer({ userId, questionId });

    return new RespondAnswerDto(
      answerView.question, // 문제
      answerView.category, // 카테고리
      answerView.isBookmarked, // 북마크 여부
      answerView.solution, // 모범답안
      answerView.userId ?? undefined, // 로그인 안했으면 undefined
      answerView.content ?? undefined // 이전 답변 없으면 undefined
    );
  }
}
