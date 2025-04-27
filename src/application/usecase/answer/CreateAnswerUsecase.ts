import { Answer } from "@/domain/entities/Answer";
import { AnswerRepository } from "@/domain/repositories/AnswerRepository";
import { CreateAnswerDto } from "./dto/CreateAnswerDto";

export class CreateAnswerUsecase {
  constructor(private readonly answerRepository: AnswerRepository) {}
  //답변을 만들기 위한 입력 데이터 객체 (DTO)         //리턴값
  async execute(createDto: CreateAnswerDto): Promise<Answer> {
    const { userId, questionId, content, userName, avatarUrl } = createDto;
    console.log("userId", userId);
    if (!createDto.userId) {
      //로그인 페이지로 이동 추가
      throw new Error("회원이 아닙니다.");
    }

    const answer = new Answer(userId, questionId, content, userName, avatarUrl);
    const newAnswer = await this.answerRepository.createAnswer(answer);
    return newAnswer;
  }
}
