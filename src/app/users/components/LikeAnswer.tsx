"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";

export default function LikeAnswerPage() {
  // 임시로 내 아바타 url 입력 -> 추후 답변 사용자 아바타로 대체
  const { user } = useAuthStore();

  return (
    <Card variant="default">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={user?.avatarUrl} alt="프로필 이미지" />
            <AvatarFallback>DK</AvatarFallback>
          </Avatar>
          <p className="line-clamp-2">
            Next.js는 버전 13부터 React 18에서 도입된 서버 컴포넌트를 지원하고 있습니다. 시간이
            흐르면서 많은 분이 이를 익숙하게 활용하고 있지만, 저처럼 개념 고 있지만, 저처럼 개념고
            있지만, 저처럼 개념고 있지만, 내용을 늘려볼까 ㅋㅋㅋ
          </p>
        </div>
        <div className="flex items-center gap-2 txt-sm !text-[var(--gray-02)]">
          <p>작성자 이름</p>
          <p>2025.01.01</p>
        </div>
      </div>
    </Card>
  );
}
