"use client";

import { Card } from "@/components/ui/card";

export default function CommentPage() {
  const comments = [
    {
      id: 1,
      content: "내공냠냠 내공냠냠 내공냠냠 내공냠냠 내공냠냠 내공냠냠 내공냠냠 내공냠냠 내공냠냠",
      question: "HTTP 메소드에 대해 설명해주세요",
    },
    {
      id: 2,
      content: "어떻게 useEffect를 적절하게 활용할 수 있을까요?",
      question: "React의 useEffect 동작 원리는 무엇인가요?",
    },
  ];

  return (
    <div className="flex flex-col gap-4 mb-[100px]">
      {comments.map((item) => (
        <Card key={item.id} variant="default" className="flex flex-col gap-1">
          <p className="line-clamp-2">{item.content}</p>
          <p className="txt-sm !text-[var(--gray-02)] line-clamp-1">{item.question}</p>
        </Card>
      ))}
    </div>
  );
}
