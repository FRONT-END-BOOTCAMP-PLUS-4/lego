import { Comment } from "@/domain/entities/Comment";

export interface CommentRepository {
  countByQuestionAndAnswer(questionId: number, answerEmail: string): Promise<number>;
  getByQuestionAndAnswer(questionId: number, answerEmail: string): Promise<Comment[]>;
}