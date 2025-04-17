import { User } from "@/domain/enities/User";

export interface AuthRepository {
  loginWithOAuth(code: string): Promise<User>;
}
