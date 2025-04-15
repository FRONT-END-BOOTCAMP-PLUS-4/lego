import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "로그아웃 성공" });

  // 쿠키 삭제
  response.cookies.set("admin_token", "", {
    path: "/",
    expires: new Date(0), // 만료 시간을 과거로 설정하여 쿠키 삭제
  });

  return response;
}