import { NextRequest, NextResponse } from "next/server";
import { SbAdminRepository } from "@/infra/repositories/supabase/SbAdminRepository";
import { LoginAdminUsecase } from "@/application/usecase/admin/login/LoginAdminUsecase";
import { AdminLoginDto } from "@/application/usecase/admin/login/dto/AdminLoginDto";

export async function POST(req: NextRequest) {
  try {
    // 요청 본문 읽기
    const body = await req.json();

    // DTO 생성
    if (!body.name || !body.password) {
      throw new Error("이름과 비밀번호는 필수 입력 항목입니다.");
    }
    const dto = new AdminLoginDto(body.name, body.password);

    // 유스케이스 실행
    const usecase = new LoginAdminUsecase(new SbAdminRepository());
    const response = await usecase.execute(dto);

    // 유스케이스에서 생성된 응답 반환
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}