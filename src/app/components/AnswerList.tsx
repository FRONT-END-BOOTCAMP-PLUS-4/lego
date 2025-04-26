"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface PopularAnswer {
  questionId: number;
  answerContent: string;
  questionTitle: string;
  username: string;
  useremail: string;
}

export default function PopularAnswers() {
  const [answers, setAnswers] = useState<PopularAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const res = await fetch("/api/home", { next: { revalidate: 60 } });
        if (!res.ok) throw new Error("네트워크 응답 실패");

        const data = await res.json();
        if (isMounted) {
          setAnswers(data.popularAnswers || []);
        }
      } catch (err) {
        console.error("많이 좋아요 받은 답변 불러오기 실패:", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="mb-[150px]" data-aos="fade-left">
      <h3 className="txt-2xl-b pb-5">많이 좋아요 받은 답변</h3>
      <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-3 items-stretch">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="h-[150px] animate-pulse" />
          ))
        ) : error ? (
          <p className="text-center col-span-2 text-red-500">
            답변 데이터를 불러오는 데 실패했습니다.
          </p>
        ) : answers.length === 0 ? (
          <p className="text-center col-span-2 text-gray-500">좋아요를 받은 답변이 없습니다.</p>
        ) : (
          answers.map((item, i) => (
            <Link href={`/questions/${item.questionId}/answers/${item.useremail}`} key={`al-${i}`}>
              <Card className="flex flex-col gap-[var(--space-40)] h-full">
                <p className="txt-xl-b line-clamp-2">{item.answerContent}</p>
                <div className="flex justify-between txt-sm !text-[var(--gray-02)] mt-auto">
                  <p className="txt-sm-b !text-[var(--gray-02)]">{item.questionTitle}</p>
                  <p>{item.username}</p>
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
