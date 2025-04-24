"use client";

import CommentSection from "./components/CommentSection";
import AnswerContent from "./components/AnswerContent";

export default function AnswerDetailPage() {
  return (
    <div className="container mx-auto pt-[40px] md:px-6">
      <div className="pb-[var(--space-24)] txt-2xl-b">답변 상세보기</div>

      <AnswerContent />
      {/* 본문과 텍스트 사이의 패딩 */}
      <div className="mb-[150px]"></div>
      <CommentSection />
    </div>
  );
}
