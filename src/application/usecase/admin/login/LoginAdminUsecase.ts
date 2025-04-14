import { AdminRepository } from "@/domain/repositories/AdminRepository";
import { AdminLoginDto } from "./dto/AdminLoginDto";
import { AdminTokenDto } from "./dto/AdminTokenDto";

export class LoginAdminUsecase {
  constructor(private readonly repo: AdminRepository) {} // 의존성 주입

  async execute(dto: AdminLoginDto): Promise<AdminTokenDto> {
    // 이름과 비밀번호로 관리자 찾기
    const admin = await this.repo.findByCredentials(dto.name, dto.password);
    if (!admin) throw new Error("이름 또는 비밀번호가 일치하지 않습니다.");

    // 토큰 생성
    const token = `admin-token-${admin.id}-${Date.now()}`;
    return new AdminTokenDto(admin.id, token);
  }
}