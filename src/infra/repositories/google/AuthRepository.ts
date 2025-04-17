import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { User } from "@/domain/entities/User";
import { createJWT } from "@/utils/jwt";

export class GoogleAuthRepository implements AuthRepository {
  async loginWithOAuth(code: string): Promise<User> {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback?provider=google`,
        grant_type: "authorization_code",
      }),
    });

    const { access_token } = await tokenRes.json();
    console.log(access_token);

    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const userData = await userRes.json();
    console.log(userData);

    const user = new User(
      userData.id.toString(),
      userData.name || userData.email,
      userData.name,
      userData.email,
      userData.picture
    );

    createJWT(user);
    return user;
  }
}
