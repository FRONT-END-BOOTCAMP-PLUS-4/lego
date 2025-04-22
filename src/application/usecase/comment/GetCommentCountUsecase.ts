//댓글 개수 출력 유스케이스

import { CommentRepository } from "@/domain/repositories/CommentRepository";
import { CommentCountDto } from "./dto/CommentCountDto";

export class GetCommentCountUsecase {
  constructor(private readonly commentRepo: CommentRepository) {}

  async execute(questionId: number, answerEmail: string): Promise<CommentCountDto> {
    const count = await this.commentRepo.countByQuestionAndAnswer(questionId, answerEmail);
    return new CommentCountDto(count);
  }
}
