"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/utils/handleFormat";
import { Bookmark } from "lucide-react";

type PopularQuestion = {
  questionId: number;
  title: string;
  categoryName: string;
  bookmarkCount: number;
};

export default function BookmarkList() {
  const { user } = useAuthStore();

  const [popularQuestions, setPopularQuestions] = useState<PopularQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularQuestions = async () => {
      try {
        const res = await fetch("/api/home");
        const data = await res.json();
        setPopularQuestions(data.popularQuestions || []);
      } catch (err) {
        console.error("인기 질문 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularQuestions();
  }, []);

  return (
    <section data-aos="fade-up">
      <h3 className="txt-2xl-b pb-[var(--space-24)]">많이 스크랩된 콘텐츠</h3>

      <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-3">
        {loading ? (
          [...Array(4)].map((_, i) => <Card key={i} variant="default" className="h-[120px]" />)
        ) : popularQuestions.length === 0 ? (
          <p className="text-center col-span-2 text-gray-500">스크랩된 콘텐츠가 없습니다.</p>
        ) : (
          popularQuestions.map((item) => (
            <Link
              href={`/questions/${item.questionId}?userId=${user?.email}`}
              key={`bm-${item.questionId}`}
            >
              <Card variant="default" className="flex flex-col gap-[var(--space-40)]">
                <p className="txt-xl-b line-clamp-1">{item.title}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">{item.categoryName}</Badge>
                  <div className="flex gap-1 items-center">
                    <Bookmark className="fill-[var(--black)] stroke-none" />
                    <p>{formatNumber(item.bookmarkCount)}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
