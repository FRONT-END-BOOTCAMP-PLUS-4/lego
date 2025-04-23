export class DeleteLikeDto {
  constructor(
    public questionId: number,
    public answerEmail: string,
    public userId: string
  ) {}
}
