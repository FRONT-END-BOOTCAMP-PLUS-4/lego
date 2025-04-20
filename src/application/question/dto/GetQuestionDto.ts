export class GetQuestionDto {
  constructor(
    public questionId: number,
    public userId?: string
  ) {}
}
