"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Skeleton } from "@/components/ui/skeleton";

interface BookmarkItem {
  questionId: number;
  questionTitle: string;
  categoryImageUrl: string;
}

export default function BookmarkPage() {
  const { user } = useAuthStore();
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} variant="tight" className="flex items-center gap-6">
            <Skeleton className="w-9 h-9 rounded-full" />
            <Skeleton className="h-6 w-[80%]" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {bookmarks.map((item) => (
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
    </div>
  );
}
