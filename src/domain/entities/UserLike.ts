export class UserLikedAnswer {
  constructor(
    public readonly questionId: number,
    public readonly answerContent: string,
    public readonly answerAuthor: string,
    public readonly createdAt: string
  ) {}
}
