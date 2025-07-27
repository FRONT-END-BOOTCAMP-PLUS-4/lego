//댓글 DTO
export class CommentDto {
    constructor(
      public id: number,
      public content: string,
      public createdAt: Date,
      public email: string,
      public username: string,
      public avatarUrl: string
    ) {}
  }