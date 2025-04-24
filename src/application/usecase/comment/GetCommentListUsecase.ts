//댓글 리스트 유스케이스

import { CommentRepository } from "@/domain/repositories/CommentRepository";
import { CommentDto } from "./dto/CommentDto";

export class GetCommentListUsecase {
  constructor(private readonly commentRepo: CommentRepository) {}

  async execute(questionId: number, answerEmail: string): Promise<CommentDto[]> {
    const comments = await this.commentRepo.getByQuestionAndAnswer(questionId, answerEmail);

    return comments.map(
      (comment) =>
        new CommentDto(
          comment.id,
          comment.content,
          comment.createdAt,
          comment.email,
          comment.user_name,
          comment.avatar_url
        )
    );
  }
}