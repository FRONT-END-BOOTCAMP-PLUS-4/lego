import { Answer } from "./Answer";

//클라이언트에게 전달할 것
export class AnswerView extends Answer {
  constructor(
    userId: number,
    questionId: number,
    content: string, //사용자의 답변
    createdAt: Date,
    public nickName: string, //답변한 사용자
    public avatar: string,
    public isLike: boolean,
    public likeCount: number = 0,
    public question: string, //문제
    public category: string //카테고리
  ) {
    super(userId, questionId, content, createdAt);
  }
}
