export class AnswerView {
  constructor(
    public email: string,
    public content: string,
    public createdAt: string,
    public avatarUrl: string,
    public username: string,
    public likeCount?: number,
    public questionId?: number,
    public category?: string,
    public question?: string,
    public isLike?: boolean
  ) {}
}
