export class RespondAnswerDto {
  constructor(
    public question: string, //문제
    public category: string, //카테고리
    public isBookmarked: boolean,
    public answer: string, //모범답안
    public content?: string //이전 답변 없으면 없을 수 있음
  ) {}
}
