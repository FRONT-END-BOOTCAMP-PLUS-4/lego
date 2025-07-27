export class UserActivityDto {
  constructor(
    public readonly totalAnswers: number,
    public readonly activeDays: number,
    public readonly dailyActivity: { date: string; count: number }[]
  ) {}
}
