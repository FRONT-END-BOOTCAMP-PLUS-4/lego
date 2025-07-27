"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import { useAuthStore } from "@/store/useAuthStore";
import Empty from "@/app/components/Empty";

interface LikedAnswer {
  questionId: number;
  answerContent: string;
  answerAuthor: string;
  answerAuthorEmail: string;
  createdAt: string;
  avatarUrl: string;
}

export default function LikeAnswerPage() {
  const { user } = useAuthStore();
  const [likedAnswers, setLikedAnswers] = useState<LikedAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pageNumber, setPageNumber] = useState(1);
  const [currentPageBlock, setCurrentPageBlock] = useState(1);
  const totalCount = likedAnswers.length;
  const itemsPerPage = 5;
  const paginatedData = likedAnswers.slice(
    (pageNumber - 1) * itemsPerPage,
    pageNumber * itemsPerPage
  );

  useEffect(() => {
    if (!user?.email) return;

    const fetchLikedAnswers = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/users/history/likes?email=${user.email}`);
        const data = await res.json();
        setLikedAnswers(data || []);
      } catch (error) {
        console.error("좋아요한 답변 가져오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikedAnswers();
  }, [user?.email]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} variant="default" className="space-y-4 p-4">
            <div className="flex gap-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="h-6 flex-1" />
            </div>
            <Skeleton className="h-4 w-1/2" />
          </Card>
        ))}
      </div>
    );
  }

  if (paginatedData.length === 0) {
    return <Empty text={"아직 좋아요한 답변이 없어요"} />;
  }

  return (
    <div className="flex flex-col gap-3">
      {paginatedData.map((item) => (
        <Link
          key={item.questionId}
          href={`/questions/${item.questionId}/answers/${item.answerAuthorEmail}`}
        >
          <Card variant="default" className="p-4">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={item.avatarUrl} alt="프로필 이미지" />
                  <AvatarFallback>{item.answerAuthor[0] ?? "?"}</AvatarFallback>
                </Avatar>
                <p className="line-clamp-2">{item.answerContent}</p>
              </div>
              <div className="flex items-center gap-2 txt-sm !text-[var(--gray-02)]">
                <p className="txt-sm-b">{item.answerAuthor}</p>
                <p>{new Date(item.createdAt).toLocaleDateString("ko-KR")}</p>
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
