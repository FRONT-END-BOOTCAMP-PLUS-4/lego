"use client";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";

interface QuestionHeaderProps {
  content: string;
  categoryName: string;
  isBookmarked: boolean;
  questionId: number;
  currentUser: boolean;
}

export default function QusetionHeader({
  content,
  categoryName,
  isBookmarked: bookmarkState,
  questionId,
  currentUser,
}: QuestionHeaderProps) {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const userEmail = user?.email;
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(bookmarkState);

  const handleToggleBookmark = async () => {
    const newState = !isBookmarked;
    const method = newState ? "POST" : "DELETE";
    const formData = {
      userId: userEmail,
      questionId,
    };
    if (!currentUser) {
      return router.push("/login");
    }

    try {
      const response = await fetch("/api/bookmarks", {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(newState ? "북마크 저장 실패" : "북마크 해제 실패");
      }
      setIsBookmarked(newState);
      toast.success(newState ? "북마크가 저장되었습니다." : "북마크가 해제되었습니다.");
    } catch (error) {
      toast.error(`${(error as Error).message}`);
    }
  };

  return (
    <>
      <header className="flex justify-between items-center pb-[18px]">
        <div className="flex items-center pb-[18px]">
          <Badge className="mr-[16px]">{categoryName}</Badge>
          <h3 className="txt-3xl-b">{content}</h3>
        </div>
        <div
          className="flex items-center justify-center w-[32px] h-[32px]"
          onClick={handleToggleBookmark}
        >
          <Bookmark
            size={32}
            fill={isBookmarked ? "[var(--black)]" : "none"}
            className="cursor-pointer"
          />
        </div>
      </header>
    </>
  );
}
