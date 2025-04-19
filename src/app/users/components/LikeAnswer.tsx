"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";

export default function LikeAnswerPage() {
  const { user } = useAuthStore();

  const likedAnswers = [
    {
      id: 1,
      content:
        "Next.js는 버전 13부터 React 18에서 도입된 서버 컴포넌트를 지원하고 있습니다. Next.js는 버전 13부터 React 18에서 도입된 서버 컴포넌트를 지원하고 있습니다. Next.js는 버전 13부터 React 18에서 도입된 서버 컴포넌트를 지원하고 있습니다.",
      user: {
        name: "아무개",
        avatarUrl: user?.avatarUrl,
      },
      createdAt: "2025.01.01",
    },
    {
      id: 2,
      content:
        "React의 useEffect는 컴포넌트가 마운트되거나 업데이트될 때 실행되는 훅입니다. React의 useEffect는 컴포넌트가 마운트되거나 업데이트될 때 실행되는 훅입니다. React의 useEffect는 컴포넌트가 마운트되거나 업데이트될 때 실행되는 훅입니다.",
      user: {
        name: "홍길동",
        avatarUrl: user?.avatarUrl,
      },
      createdAt: "2025.01.02",
    },
  ];

  return (
    <div className="flex flex-col gap-6 mb-[100px]">
      {likedAnswers.map((item) => (
        <Card key={item.id} variant="default">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src={item.user.avatarUrl} alt="프로필 이미지" />
                <AvatarFallback>{item.user.name[0] ?? "?"}</AvatarFallback>
              </Avatar>
              <p className="line-clamp-2">{item.content}</p>
            </div>
            <div className="flex items-center gap-2 txt-sm !text-[var(--gray-02)]">
              <p>{item.user.name}</p>
              <p>{item.createdAt}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
