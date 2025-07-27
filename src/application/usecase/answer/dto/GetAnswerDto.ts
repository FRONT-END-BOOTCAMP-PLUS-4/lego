export class GetAnswerDto {
  constructor(
    public userId: string | null,
    public questionId: number,
    public answerAuthorId?: string
  ) {}
}
