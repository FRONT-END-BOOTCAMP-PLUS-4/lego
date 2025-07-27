import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import { User } from "@/domain/entities/User";

export interface DecodedToken {
  id: string;
  name: string;
  email: string;
  nickname: string;
  avatarUrl: string;
}

export const createJWT = (user: User): string => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      nickname: user.nickname,
      avatarUrl: user.avatarUrl,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};

export const decodeJWT = (token: string): DecodedToken => {
  return jwtDecode(token);
};
