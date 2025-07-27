import { NextRequest, NextResponse } from "next/server";
import { SbSubscribeRepository } from "@/infra/repositories/supabase/SbSubscribeRepository";
import { SubscribeUsecase } from "@/application/subscribe/SubscribeUsecase";

const usecase = new SubscribeUsecase(new SbSubscribeRepository());

// 구독 등록
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    await usecase.subscribe(email);

    return NextResponse.json({ message: "구독 완료" }, { status: 201 });
  } catch (error) {
    console.error("구독 실패:", error);
    return NextResponse.json({ error: "구독 실패" }, { status: 500 });
  }
}

// 구독 취소
export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json();
    await usecase.unsubscribe(email);

    return NextResponse.json({ message: "구독 취소 완료" }, { status: 200 });
  } catch (error) {
    console.error("구독 취소 실패:", error);
    return NextResponse.json({ error: "구독 취소 실패" }, { status: 500 });
  }
}

// 현재 구독 여부 확인 (email 쿼리로 확인)
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email");
    if (!email) {
      return NextResponse.json({ error: "이메일이 필요합니다." }, { status: 400 });
    }

    const isSubscribed = await usecase.isSubscribed(email);
    return NextResponse.json({ subscribed: isSubscribed }, { status: 200 });
  } catch (error) {
    console.error("구독 여부 확인 실패:", error);
    return NextResponse.json({ error: "구독 상태 확인 실패" }, { status: 500 });
  }
}
