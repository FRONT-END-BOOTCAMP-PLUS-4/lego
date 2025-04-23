export class HomePopularQuestion {
  constructor(
    public readonly questionId: number,
    public readonly title: string,
    public readonly categoryName: string,
    public readonly bookmarkCount: number
  ) {}
}
