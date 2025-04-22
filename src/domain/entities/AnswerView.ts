export class AnswerView {
  constructor(
    public email: string,
    public content: string,
    public createdAt: string,
    public avatarUrl: string,
    public username: string,
    public likeCount: number
  ) {}
}
