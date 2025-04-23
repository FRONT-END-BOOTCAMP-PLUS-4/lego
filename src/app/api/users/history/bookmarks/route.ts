import { NextRequest, NextResponse } from "next/server";
import { GetUserBookmarksUsecase } from "@/application/user/GetUserBookmarkUsecase";
import { SbUserRepository } from "@/infra/repositories/supabase/SbUserRepository";

const usecase = new GetUserBookmarksUsecase(new SbUserRepository());

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.json({ error: "이메일이 필요합니다." }, { status: 400 });

  try {
    const bookmarks = await usecase.execute(email);
    return NextResponse.json(bookmarks, { status: 200 });
  } catch (error) {
    console.error("북마크 조회 실패:", error);
    return NextResponse.json({ error: "북마크 정보를 불러오지 못했습니다." }, { status: 500 });
  }
}
