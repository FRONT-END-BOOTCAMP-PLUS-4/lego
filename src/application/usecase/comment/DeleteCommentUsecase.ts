import { CommentRepository } from "@/domain/repositories/CommentRepository";

export class DeleteCommentUsecase {
  constructor(private readonly commentRepo: CommentRepository) {}

  async execute(id: number): Promise<void> {
    await this.commentRepo.delete(id);
  }
}