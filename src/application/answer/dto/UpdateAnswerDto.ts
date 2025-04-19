export class UpdateAnswerDto {
  constructor(
    public userId: string,
    public questionId: number,
    public content: string,
    public createdAt: Date
  ) {}
}
