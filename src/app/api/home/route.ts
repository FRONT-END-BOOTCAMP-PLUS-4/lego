import { NextResponse } from "next/server";
import { SbHomeRepository } from "@/infra/repositories/supabase/SbHomeRepository";
import { GetHomeDataUsecase } from "@/application/usecase/home/GetHomeDataUsecase";

const usecase = new GetHomeDataUsecase(new SbHomeRepository());

export async function GET() {
  try {
    const data = await usecase.execute();
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error("홈 데이터 조회 실패:", e);
    return NextResponse.json({ error: "홈 데이터를 불러올 수 없습니다." }, { status: 500 });
  }
}
