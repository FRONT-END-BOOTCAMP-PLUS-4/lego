export class Question {
  constructor(
    public id: number,
    public categoryId: number,
    public content: string,
    public solution: string,
    public answer: string,
    public views: number,
    public createdAt: Date,
    public isBookmarked: boolean,
    public categoryName: string
  ) {}
}
