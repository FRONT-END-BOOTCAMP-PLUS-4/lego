export class UserActivity {
  constructor(
    public readonly email: string,
    public readonly totalAnswers: number,
    public readonly activeDays: number,
    public readonly dailyActivity: { date: string; count: number }[]
  ) {}
}
