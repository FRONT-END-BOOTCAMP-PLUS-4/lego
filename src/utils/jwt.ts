import jwt from "jsonwebtoken";
import { User } from "@/domain/enities/User";

export const createJWT = (user: User): string => {
  return jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};
