"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import { formatNumber } from "@/utils/handleFormat";
import { Heart } from "lucide-react";
import Empty from "@/app/components/Empty";

interface UserAnswer {
  questionId: number;
  categoryName: string;
  questionTitle: string;
  answerContent: string;
  createdAt: string;
  likeCount: number;
}

export default function MyAnswerPage() {
  const { user } = useAuthStore();
  const [myAnswers, setMyAnswers] = useState<UserAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pageNumber, setPageNumber] = useState(1);
  const [currentPageBlock, setCurrentPageBlock] = useState(1);
  const itemsPerPage = 5;
  const totalCount = myAnswers.length;
  const paginatedAnswers = myAnswers.slice(
    (pageNumber - 1) * itemsPerPage,
    pageNumber * itemsPerPage
  );

  useEffect(() => {
    const fetchAnswers = async () => {
      if (!user?.email) return;
      setIsLoading(true);
      try {
        const res = await fetch(`/api/users/history/answers?email=${user.email}`);
        const data = await res.json();
        setMyAnswers(data || []);
      } catch (error) {
        console.error("답변 데이터 가져오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnswers();
  }, [user?.email]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: itemsPerPage }).map((_, i) => (
          <Card key={i} variant="default" className="space-y-5 p-4">
            <div className="flex gap-4 items-center">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 flex-1" />
            </div>
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-[80%]" />
          </Card>
        ))}
      </div>
    );
  }

  if (paginatedAnswers.length === 0) {
    return <Empty text={"아직 작성한 답변이 없어요"} />;
  }

  return (
    <div className="flex flex-col gap-3">
      {paginatedAnswers.map((answer) => (
        <Link
          href={`/questions/${answer.questionId}?userId=${user?.email}`}
          key={answer.questionId}
        >
          <Card variant="default" className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="default">{answer.categoryName}</Badge>
              <p className="txt-xl-b line-clamp-1">{answer.questionTitle}</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="line-clamp-2">{answer.answerContent}</p>
              <div className="flex justify-between items-center">
                <p className="txt-sm !text-[var(--gray-02)]">
                  {new Date(answer.createdAt).toLocaleDateString("ko-KR")}
                </p>
                <div className="flex items-center gap-1 txt-sm !text-[var(--gray-02)]">
                  <Heart size={20} className="fill-[var(--black)] stroke-none" />
                  <p>{formatNumber(answer.likeCount)}</p>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}

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
