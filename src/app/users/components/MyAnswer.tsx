"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

// 실제 데이터로 매핑 필요
const myAnswers = [
  {
    id: 1,
    category: "JavaScript",
    title: "HTTP 메소드에 대한 설명",
    content:
      "Next.js는 버전 13부터 React 18에서 도입된 서버 컴포넌트를 지원하고 있습니다. 시간이 흐르면서 많은 분이 이를 익숙하게 활용하고 있지만, 저처럼 개념 어쩌구저쩌구 늘려볼까",
    date: "1995.12.14",
    likeCount: 1000,
  },
  {
    id: 2,
    category: "React",
    title: "useEffect는 언제 쓰나요?",
    content:
      "useEffect는 부수효과 처리용 훅으로, 컴포넌트가 마운트되거나 업데이트될 때 특정 로직을 실행하기 위해 사용됩니다...",
    date: "2023.10.01",
    likeCount: 284,
  },
];

export default function MyAnswer() {
  return (
    <div className="flex flex-col gap-[var(--space-24)] mb-[100px]">
      {myAnswers.map((answer) => (
        <Card key={answer.id} variant="default">
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="default">{answer.category}</Badge>
            <p className="txt-3xl-b">{answer.title}</p>
          </div>
          <div className="flex flex-col gap-[var(--space-40)]">
            <p className="line-clamp-2">{answer.content}</p>
            <div className="flex justify-between items-center">
              <p className="txt-sm !text-[var(--gray-02)]">{answer.date}</p>
              <div className="flex items-center gap-2 txt-sm !text-[var(--gray-02)]">
                <Heart className="w-4 h-4 fill-red-500 stroke-none" />
                <p>{answer.likeCount}</p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
