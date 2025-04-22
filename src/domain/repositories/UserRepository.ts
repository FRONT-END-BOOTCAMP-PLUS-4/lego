import { UserActivity } from "../entities/UserActivity";
import { UserAnswer } from "../entities/UserAnswer";

export interface UserRepository {
  getUserActivity(email: string): Promise<UserActivity>;
  getUserAnswers(email: string): Promise<UserAnswer[]>;
}
