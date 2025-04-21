export class DeleteAnswerDto {
  constructor(
    public userId: string,
    public questionId: number
  ) {}
}
