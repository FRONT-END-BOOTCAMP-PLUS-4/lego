"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
interface QuestionHeaderProps {
  content: string;
  categoryName: string;
  isBookmarked: boolean;
}
export default function QusetionHeader({
  content,
  categoryName,
  isBookmarked: bookmarkState,
}: QuestionHeaderProps) {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(bookmarkState);
  const handleToggleBookmark = () => setIsBookmarked((prev) => !prev);
  return (
    <header className="flex justify-between items-center pb-[18px]">
      <div className="flex items-center pb-[18px]">
        <Badge className="mr-[16px]">{categoryName}</Badge>
        <h3 className="txt-3xl-b">{content}</h3>
      </div>
      <div
        className="flex items-center justify-center w-[32px] h-[32px]"
        onClick={handleToggleBookmark}
      >
        <Image
          src={`/assets/icons/bookmark${isBookmarked ? "_fill" : ""}.svg`}
          alt="bookmark icon"
          width={24}
          height={24}
          className={`w-[24px] h-[24px] object-center cursor-pointer ${isBookmarked && "w-[28px] h-[28px]"}`}
        />
      </div>
    </header>
  );
}
