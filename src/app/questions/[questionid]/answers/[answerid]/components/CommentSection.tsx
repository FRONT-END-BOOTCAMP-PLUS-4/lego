"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { TextArea } from "@/components/ui/textArea";

type Comment = {
  id: number;
  author: string;
  content: string;
  date: string;
};

interface CommentSectionProps {
  comments: Comment[];
}

export default function CommentSection({ comments }: CommentSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const currentComments = comments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleMovePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* 댓글 입력 영역 */}
      <div className="mt-[40px] mb-[16px]">
        <label className="txt-sm-b" htmlFor="comment">
          <span className="text-[var(--gray-02)]">댓글 수 </span>
          <span className="text-black">{comments.length}</span>
        </label>
        <div className="mb-[10px]" />
        <div className="flex gap-2">
          <TextArea placeholder="Type your message here" />
          <Button className="w-[80px] h-[120px]" variant="outline">
            등록
          </Button>
        </div>
      </div>

      <div className="mb-[58px]" />

      {/* 댓글 리스트 */}
      <div className="mt-[30px] space-y-8">
        {currentComments.map((comment) => (
          <div key={comment.id} className="border-b pb-4 flex gap-4">
            <span className="w-[36px] h-[36px] inline-block bg-[var(--gray-01)] rounded-full shrink-0"></span>
            <div className="flex-1">
              <div className="text-sm font-bold mb-1">{comment.author}</div>
              <div className="text-base mb-1">{comment.content}</div>
              <div className="text-xs text-[var(--gray-02)]">{comment.date}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Button variant="gray" size="sm">수정</Button>
              <Button variant="gray" size="sm">삭제</Button>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-[40px]">
        <Pagination
          totalCount={comments.length}
          itemsPerPage={itemsPerPage}
          pageNumber={currentPage}
          currentPageBlock={currentPage}
          handleMovePageBlock={() => {}}
          handleMovePage={handleMovePage}
        />
      </div>
    </>
  );
}