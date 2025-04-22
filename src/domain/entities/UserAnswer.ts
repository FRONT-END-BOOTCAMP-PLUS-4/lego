export class UserAnswer {
  constructor(
    public readonly questionId: number,
    public readonly categoryName: string,
    public readonly questionTitle: string,
    public readonly answerContent: string,
    public readonly createdAt: string,
    public readonly likeCount: number
  ) {}
}
