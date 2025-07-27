export class CreateCommentDto {
    constructor(
      public question_id: number,
      public answer_email: string,
      public content: string,
      public email: string,
      public user_name: string,
      public avatar_url: string
    ) {}
  }