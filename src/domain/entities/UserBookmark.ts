export class UserBookmark {
  constructor(
    public readonly questionId: number,
    public readonly questionTitle: string,
    public readonly categoryImageUrl: string
  ) {}
}
