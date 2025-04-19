export class Answer {
  constructor(
    public userId: string,
    public questionId: number,
    public content: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
