"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import { useAuthStore } from "@/store/useAuthStore";
import Empty from "@/app/components/Empty";

interface UserComment {
  questionId: number;
  questionTitle: string;
  commentContent: string;
  answerAuthorEmail: string;
}

export default function CommentPage() {
  const { user } = useAuthStore();
  const [comments, setComments] = useState<UserComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pageNumber, setPageNumber] = useState(1);
  const [currentPageBlock, setCurrentPageBlock] = useState(1);
  const itemsPerPage = 5;
  const totalCount = comments.length;
  const paginated = comments.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);

  useEffect(() => {
    const fetchComments = async () => {
      if (!user?.email) return;
      setIsLoading(true);
      try {
        const res = await fetch(`/api/users/history/comments?email=${user.email}`);
        const data = await res.json();
        setComments(data || []);
      } catch (error) {
        console.error("댓글 데이터 가져오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [user?.email]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
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
      {totalCount === 0 ? (
        <Empty text="아직 작성한 댓글이 없어요" />
      ) : (
        paginated.map((item, i) => (
          <Link key={i} href={`/questions/${item.questionId}/answers/${item.answerAuthorEmail}`}>
            <Card variant="default" className="flex flex-col gap-2 p-4">
              <p className="line-clamp-2">{item.commentContent}</p>
              <p className="txt-sm !text-[var(--gray-02)] line-clamp-1">{item.questionTitle}</p>
            </Card>
          </Link>
        ))
      )}

      {totalCount !== 0 && (
        <Pagination
          totalCount={totalCount}
          itemsPerPage={itemsPerPage}
          pageNumber={pageNumber}
          currentPageBlock={currentPageBlock}
          handleMovePage={setPageNumber}
          handleMovePageBlock={setCurrentPageBlock}
        />
      )}
    </div>
  );
}
