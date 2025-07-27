import { UserRepository } from "@/domain/repositories/UserRepository";
import { UserActivityDto } from "@/application/user/dto/UserActivityDto";

export class GetUserActivityUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<UserActivityDto> {
    const activity = await this.userRepository.getUserActivity(email);
    return new UserActivityDto(activity.totalAnswers, activity.activeDays, activity.dailyActivity);
  }
}
