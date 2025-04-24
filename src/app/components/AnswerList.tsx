"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface PopularAnswer {
  answerContent: string;
  questionTitle: string;
  username: string;
  useremail: string;
}

export default function PopularAnswers() {
  const [answers, setAnswers] = useState<PopularAnswer[]>([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      const res = await fetch("/api/home");
      const data = await res.json();
      setAnswers(data.popularAnswers);
    };
    fetchAnswers();
  }, []);

  return (
    <section className="mb-[150px]" data-aos="fade-left">
      <h3 className="txt-3xl-b pb-[var(--space-36)]">많이 좋아요 받은 답변</h3>
      <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-6">
        {answers.map((item, i) => (
          <Link href={`/questions/${i + 1}/answers/${item.useremail}`} key={`al-${i}`}>
            <Card
              variant="none"
              className="flex flex-col gap-[var(--space-40)] p-[var(--space-36)]"
            >
              <p className="txt-2xl-b line-clamp-3">{item.answerContent}</p>
              <div className="flex justify-between txt-sm !text-[var(--gray-02)]">
                <p>{item.questionTitle}</p>
                <p>{item.username}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
