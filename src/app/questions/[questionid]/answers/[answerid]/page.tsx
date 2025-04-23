"use client";

import CommentSection from "./components/CommentSection";
import AnswerContents from "./components/AnswerContents";

export default function AnswerDetailPage() {
  // Mock data for comments
  // 실제 데이터는 API 호출 등을 통해 가져와야 합니다.
  const comments = Array(50)
    .fill(null)
    .map((_, i) => ({
      id: i + 1,
      author: `작성자 ${i + 1}`,
      content: `댓글 내용 ${i + 1}`,
      date: `2025.03.${(i % 30) + 1}`,
    }));

  return (
    <div className="container mx-auto pt-[40px] md:px-6">
      <div className="pb-[var(--space-24)] txt-2xl-b">답변 상세보기</div>

      <AnswerContents />

      {/* 본문과 텍스트 사이의 패딩 */}
      <div className="mb-[150px]"></div>

     

      <CommentSection comments={comments} />
    </div>
  );
}
