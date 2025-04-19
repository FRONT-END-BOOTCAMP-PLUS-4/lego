"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
export default function QusetionHeader() {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const handleToggleBookmark = () => setIsBookmarked((prev) => !prev);
  return (
    <header className="flex justify-between items-center pb-[18px]">
      <div className="flex items-center pb-[18px]">
        <Badge className="mr-[16px]">Javascript</Badge>
        <h3 className="txt-3xl-b">HTTP 메소드에 대한 설명</h3>
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
