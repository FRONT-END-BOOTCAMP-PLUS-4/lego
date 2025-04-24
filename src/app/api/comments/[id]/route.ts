import { NextRequest, NextResponse } from "next/server";
import { SbCommentRepository } from "@/infra/repositories/supabase/SbCommentRepository";
import { UpdateCommentUsecase } from "@/application/usecase/comment/UpdateCommentUsecase";
import { UpdateCommentDto } from "@/application/usecase/comment/dto/UpdateCommentDto";
import { DeleteCommentUsecase } from "@/application/usecase/comment/DeleteCommentUsecase";

//댓글 수정
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const { content } = await req.json();

  if (!id || !content) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const usecase = new UpdateCommentUsecase(new SbCommentRepository());
  const dto = new UpdateCommentDto(id, content);

  await usecase.execute(dto);
  return NextResponse.json({ message: "댓글이 수정되었습니다." });
}

//댓글 삭제
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    const id = Number(params.id);
  
    if (!id) {
      return NextResponse.json({ error: "Invalid comment ID" }, { status: 400 });
    }
  
    const usecase = new DeleteCommentUsecase(new SbCommentRepository());
    await usecase.execute(id);
  
    return NextResponse.json({ message: "댓글이 삭제되었습니다." });
}