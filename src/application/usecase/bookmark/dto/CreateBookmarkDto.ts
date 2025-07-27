export class CreateBookmarkDto {
  constructor(
    public userId: string,
    public questionId: number
  ) {}
}
