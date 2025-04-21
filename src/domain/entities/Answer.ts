export class Answer {
  constructor(
    public userId: string,
    public questionId: number,
    public content: string,
    public userName: string,
    public avatarUrl: string
  ) {}
}
