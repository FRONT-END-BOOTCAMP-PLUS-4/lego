import { NextRequest, NextResponse } from "next/server";
import { SbCommentRepository } from "@/infra/repositories/supabase/SbCommentRepository";
import { UpdateCommentUsecase } from "@/application/usecase/comment/UpdateCommentUsecase";
import { UpdateCommentDto } from "@/application/usecase/comment/dto/UpdateCommentDto";
import { DeleteCommentUsecase } from "@/application/usecase/comment/DeleteCommentUsecase";

// 댓글 수정
export async function PATCH(req: NextRequest) {
  // ✅ request URL에서 직접 ID 파싱
  const url = req.nextUrl.pathname; // /api/comments/123
  const idStr = url.split("/").pop(); // '123'
  const id = Number(idStr);

  const { content } = await req.json();

  if (!id || !content) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const usecase = new UpdateCommentUsecase(new SbCommentRepository());
  const dto = new UpdateCommentDto(id, content);

  await usecase.execute(dto);
  return NextResponse.json({ message: "댓글이 수정되었습니다." });
}

// 댓글 삭제(댓글 수정 방식이랑 동일하게 작동)
export async function DELETE(req: NextRequest) {
  const url = req.nextUrl.pathname;
  const idStr = url.split("/").pop();
  const id = Number(idStr);

  if (!id) {
    return NextResponse.json({ error: "Invalid comment ID" }, { status: 400 });
  }

  const usecase = new DeleteCommentUsecase(new SbCommentRepository());
  await usecase.execute(id);

  return NextResponse.json({ message: "댓글이 삭제되었습니다." });
}
