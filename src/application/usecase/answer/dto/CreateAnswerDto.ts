export class CreateAnswerDto {
  constructor(
    //문제 답변 저장
    public userId: string,
    public questionId: number,
    public content: string,
    public userName: string,
    public avatarUrl: string
  ) {}
}
