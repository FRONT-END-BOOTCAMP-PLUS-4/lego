"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Card } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";

interface UserBookmark {
  questionId: number;
  questionTitle: string;
  categoryImageUrl: string;
}

export default function BookmarkPage() {
  const { user } = useAuthStore();
  const [bookmarks, setBookmarks] = useState<UserBookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentPageBlock, setCurrentPageBlock] = useState(1);

  const itemsPerPage = 5;
  const totalCount = bookmarks.length;
  const currentItems = bookmarks.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user?.email) return;
      setIsLoading(true);
      const res = await fetch(`/api/users/history/bookmarks?email=${user.email}`);
      const data = await res.json();
      setBookmarks(data);
      setIsLoading(false);
    };
    fetchBookmarks();
  }, [user?.email]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} variant="tight" className="flex items-center justify-between p-6">
            <div className="flex items-center gap-6 w-[90%]">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {currentItems.map((item) => (
        <Link href={`/questions/${item.questionId}?userId=${user?.email}`} key={item.questionId}>
          <Card variant="tight" className="flex items-center justify-between">
            <div className="txt-2xl-b flex items-center gap-6 cursor-pointer w-[90%]">
              <Image src={item.categoryImageUrl} width={32} height={32} alt="카테고리 아이콘" />
              <p className="line-clamp-1 w-4/5">{item.questionTitle}</p>
            </div>
            <Bookmark className="fill-[var(--black)] stroke-none" />
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
