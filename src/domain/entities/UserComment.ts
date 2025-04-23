export class UserComment {
  constructor(
    public readonly questionId: number,
    public readonly questionTitle: string,
    public readonly commentContent: string,
    public readonly answerAuthorEmail: string
  ) {}
}
