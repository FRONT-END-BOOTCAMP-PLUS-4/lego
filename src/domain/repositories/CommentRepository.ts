import { Comment } from "@/domain/entities/Comment";

export interface CommentRepository {
  countByQuestionAndAnswer(questionId: number, answerEmail: string): Promise<number>;//댓글 개수 
  getByQuestionAndAnswer(questionId: number, answerEmail: string): Promise<Comment[]>;//댓글 리스트
  create(comment: Comment): Promise<Comment>; // ✅ 반환 타입 변경
}