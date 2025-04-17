import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { User } from "@/domain/entities/User";
import { createJWT } from "@/utils/jwt";

export class GitHubAuthRepository implements AuthRepository {
  async loginWithOAuth(code: string): Promise<User> {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code,
      }),
    });

    const { access_token } = await tokenRes.json();

    const userRes = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const userData = await userRes.json();

    const user = new User(
      userData.id.toString(),
      userData.login,
      userData.name,
      userData.email,
      userData.avatar_url
    );
    createJWT(user);
    return user;
  }
}
