import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { createJWT } from "@/utils/jwt";

export class LoginWithGoogleUsecase {
  constructor(private readonly authRepo: AuthRepository) {}

  async execute(code: string): Promise<string> {
    const user = await this.authRepo.loginWithOAuth(code);
    return createJWT(user);
  }
}
