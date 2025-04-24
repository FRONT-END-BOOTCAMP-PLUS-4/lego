import { CommentRepository } from "@/domain/repositories/CommentRepository";
import { UpdateCommentDto } from "./dto/UpdateCommentDto";

export class UpdateCommentUsecase {
  constructor(private readonly commentRepo: CommentRepository) {}

  async execute(dto: UpdateCommentDto): Promise<void> {
    await this.commentRepo.updateContent(dto.id, dto.content);
  }
}