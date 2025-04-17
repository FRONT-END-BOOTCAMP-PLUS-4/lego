import { User } from "@/domain/entities/User";

export interface AuthRepository {
  loginWithOAuth(code: string): Promise<User>;
}
