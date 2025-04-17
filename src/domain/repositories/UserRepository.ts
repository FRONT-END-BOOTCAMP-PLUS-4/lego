import { User } from "../entities/User";

export interface UserRepository {
  findById(id: number): Promise<User>;
  findAll(user: User): Promise<User[]>;
  save(user: User): Promise<User>;
}
