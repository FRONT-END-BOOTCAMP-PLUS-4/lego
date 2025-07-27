import { CreateBookmarkUsecase } from "@/application/usecase/bookmark/CreateBookmarkUsecase";
import { DeleteBookmarkUsecase } from "@/application/usecase/bookmark/DeleteBookmarkUsecase";
import { CreateBookmarkDto } from "@/application/usecase/bookmark/dto/CreateBookmarkDto";
import { DeleteBookmarkrDto } from "@/application/usecase/bookmark/dto/DeleteBookmarkDto";
import { SbBookmarkRepository } from "@/infra/repositories/supabase/SbBookmarkRepository";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, questionId } = body;
    const bookmarkDto = new CreateBookmarkDto(userId, questionId);
    const bookmarkRepo = new SbBookmarkRepository();
    const createBookmarkUsecase = new CreateBookmarkUsecase(bookmarkRepo);
    const result = await createBookmarkUsecase.execute(bookmarkDto);

    return NextResponse.json({ message: "북마크 저장 완료", date: result }, { status: 200 });
  } catch (error) {
    console.error("Error creating answer:", error);
    return NextResponse.json({ error: "북마크 저장 실패" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { userId, questionId } = body;
    const bookmarkDto = new DeleteBookmarkrDto(userId, questionId);
    const bookmarkRepo = new SbBookmarkRepository();
    const createBookmarkUsecase = new DeleteBookmarkUsecase(bookmarkRepo);
    const result = await createBookmarkUsecase.execute(bookmarkDto);

    return NextResponse.json({ message: "북마크 해제 완료", date: result }, { status: 200 });
  } catch (error) {
    console.error("Error creating answer:", error);
    return NextResponse.json({ error: "북마크 해제 실패" }, { status: 500 });
  }
}
