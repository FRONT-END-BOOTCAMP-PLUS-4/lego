import { Comment } from "@/domain/entities/Comment";

export interface CommentRepository { 
  getByQuestionAndAnswer(questionId: number, answerEmail: string): Promise<Comment[]>;//댓글 리스트
  create(comment: Comment): Promise<Comment>; //댓글 생성
  updateContent(id: number, content: string): Promise<void>;//댓글 수정
  delete(id: number): Promise<void>; //댓글 삭제
}