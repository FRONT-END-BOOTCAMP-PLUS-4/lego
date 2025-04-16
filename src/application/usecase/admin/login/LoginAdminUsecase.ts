import { AdminRepository } from "@/domain/repositories/AdminRepository";
import { AdminLoginDto } from "./dto/AdminLoginDto";
import { NextResponse } from "next/server";

export class LoginAdminUsecase {
  constructor(
    private readonly repo: AdminRepository
  ) {} // 의존성 주입

  async execute(dto: AdminLoginDto): Promise<NextResponse> {
    try {
      // 이름과 비밀번호로 관리자 찾기
      const admin = await this.repo.findByCredentials(dto.name, dto.password);
      if (!admin) throw new Error("이름 또는 비밀번호가 일치하지 않습니다.");

      // 토큰 생성
      const token = `admin-token-${admin.id}-${Date.now()}`;

      // 응답 생성
      const response = NextResponse.json({ message: "로그인 성공", admin_id: admin.id });

      // Set-Cookie 헤더 추가
      response.headers.set(
        "Set-Cookie",
        `admin_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/`
      );

      return response;
    } catch (error) {
      console.error("로그인 처리 중 오류 발생:", error);
      throw new Error("로그인 처리 중 문제가 발생했습니다.");
    }
  }
}