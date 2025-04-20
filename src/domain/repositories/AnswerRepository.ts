import { Answer } from "../entities/Answer";
import { AnswerView } from "../entities/AnswerView";

interface UserAnswerParams {
  userId: string | null;
  questionId: number;
}

export interface AnswerRepository {
  //답변 저장
  createAnswer(answer: Answer): Promise<Answer>;

  //답변 수정
  updateAnswer(answer: Answer): Promise<Answer>;

  //답변 삭제
  deleteAnswer(params: UserAnswerParams): Promise<void>;

  //유저의 특정 답변 조회
  getUserAnswer(params: UserAnswerParams): Promise<AnswerView>;

  //특정 문제의 답변 리스트 조회
  findAnswersByQuestion(params: UserAnswerParams): Promise<Answer[]>;

  //특정 유저의 답변 리스트 조회
  findAllAnswersByUser(userId: number): Promise<Answer[]>;
}
