import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // 쿠키에서 admin_token 가져오기
  const token = req.cookies.get("admin_token");

  // 쿠키가 없으면 로그인 페이지로 리다이렉트
  if (!token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // 쿠키가 있으면 요청 계속 처리
  return NextResponse.next();
}

// 특정 경로에만 미들웨어 적용
export const config = {
  matcher: ["/admin/questions/:path*"], // "/admin/questions" 경로와 하위 경로에만 적용
};