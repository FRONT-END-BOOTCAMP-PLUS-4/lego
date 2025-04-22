import { UserActivity } from "../entities/UserActivity";

export interface UserRepository {
  getUserActivity(email: string): Promise<UserActivity>;
}
