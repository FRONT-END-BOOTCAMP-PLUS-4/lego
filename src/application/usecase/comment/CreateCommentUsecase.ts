import { CommentRepository } from "@/domain/repositories/CommentRepository";
import { CreateCommentDto } from "./dto/CreateCommentDto";
import { CreatedCommentDto } from "./dto/CreatedCommentDto";
import { Comment } from "@/domain/entities/Comment";

export class CreateCommentUsecase {
  constructor(private readonly commentRepo: CommentRepository) {}

  async execute(dto: CreateCommentDto): Promise<CreatedCommentDto> {
    const comment = new Comment(
      0, // id는 Supabase에서 자동 생성됨
      dto.question_id,
      dto.answer_email,
      dto.content,
      new Date(),
      dto.email,
      dto.user_name,
      dto.avatar_url
    );

    const created = await this.commentRepo.create(comment);

    return new CreatedCommentDto(
      created.id,
      created.content,
      created.createdAt,
      created.email,
      created.user_name,
      created.avatar_url
    );
  }
}