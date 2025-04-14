import { Admin } from "@/domain/enities/Admin";

export interface AdminRepository {
  findByCredentials(name: string, password: string): Promise<Admin | null>;
}