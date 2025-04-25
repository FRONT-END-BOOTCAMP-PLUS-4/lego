"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

type UserComment = {
  questionId: number;
  questionTitle: string;
  commentContent: string;
  answerAuthorEmail: string;
};

export default function CommentPage() {
  const { user } = useAuthStore();
  const [comments, setComments] = useState<UserComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 페이지네이션
  const [pageNumber, setPageNumber] = useState(1);
  const [currentPageBlock, setCurrentPageBlock] = useState(1);
  const itemsPerPage = 5;
  const totalCount = comments.length;
  const paginated = comments.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);

  useEffect(() => {
    const fetchComments = async () => {
      if (!user?.email) return;
      setIsLoading(true);
      const res = await fetch(`/api/users/history/comments?email=${user.email}`);
      const data = await res.json();
      setComments(data);
      setIsLoading(false);
    };

    fetchComments();
  }, [user?.email]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 ">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} variant="default" className="space-y-4">
            <Skeleton className="h-5 w-[90%]" />
            <Skeleton className="h-4 w-[50%]" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {paginated.map((item, i) => (
        <Link key={i} href={`/questions/${item.questionId}/answers/${item.answerAuthorEmail}`}>
          <Card variant="default" className="flex flex-col gap-1">
            <p className="line-clamp-2">{item.commentContent}</p>
            <p className="txt-sm !text-[var(--gray-02)] line-clamp-1">{item.questionTitle}</p>
          </Card>
        </Link>
      ))}

      <Pagination
        totalCount={totalCount}
        itemsPerPage={itemsPerPage}
        pageNumber={pageNumber}
        currentPageBlock={currentPageBlock}
        handleMovePage={setPageNumber}
        handleMovePageBlock={setCurrentPageBlock}
      />
    </div>
  );
}
