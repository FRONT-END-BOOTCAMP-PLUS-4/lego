export class CreatedCommentDto {
    constructor(
      public id: number,
      public content: string,
      public createdAt: Date,
      public email: string,
      public username: string,
      public avatarUrl: string
    ) {}
  }