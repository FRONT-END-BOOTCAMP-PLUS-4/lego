import { Admin } from "@/domain/entities/Admin";

export interface AdminRepository {
  findByCredentials(name: string, password: string): Promise<Admin | null>;
}
