//클라이언트에게 전달할 것
export class AnswerView {
  constructor(
    public questionId: number,
    public content: string, //사용자의 답변
    public question: string, //문제
    public category: string, //카테고리
    public isBookmarked: boolean,
    public answer: string, //모범답안
    public userId?: number
  ) {}
}
