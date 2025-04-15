import { NextRequest, NextResponse } from "next/server";
import { SbAdminRepository } from "@/infra/repositories/supabase/SbAdminRepository";
import { LoginAdminUsecase } from "@/application/usecase/admin/login/LoginAdminUsecase";
import { AdminLoginDto } from "@/application/usecase/admin/login/dto/AdminLoginDto";

export async function POST(req: NextRequest) {
  try {
    console.log("로그인 요청 수신");

    // 요청 본문 읽기
    const body = await req.json();
    console.log("요청 데이터:", body);

    // DTO 생성
    if (!body.name || !body.password) {
      throw new Error("이름과 비밀번호는 필수 입력 항목입니다.");
    }
    const dto = new AdminLoginDto(body.name, body.password);

    // 유스케이스 실행 (의존성 주입)
    const usecase = new LoginAdminUsecase(new SbAdminRepository());
    const result = await usecase.execute(dto);
    console.log("유스케이스 실행 결과:", result);

    // 응답 생성
    const res = NextResponse.json({ message: "로그인 성공", admin_id: result.admin_id });
    res.cookies.set("admin_token", result.token, { 
      httpOnly: true,
      secure: true,
    });
    console.log("응답 생성 완료, 쿠키 설정 완료");

    return res;
  } catch (err: any) {
    console.error("로그인 처리 중 오류 발생:", err.message);
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}