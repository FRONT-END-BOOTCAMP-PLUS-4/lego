export class HomePopularAnswer {
  constructor(
    public readonly questionId: string | number,
    public readonly answerContent: string,
    public readonly questionTitle: string,
    public readonly username: string,
    public readonly useremail: string
  ) {}
}
