export class HomePopularAnswer {
  constructor(
    public readonly questionId: string,
    public readonly answerContent: string,
    public readonly questionTitle: string,
    public readonly username: string,
    public readonly useremail: string
  ) {}
}
