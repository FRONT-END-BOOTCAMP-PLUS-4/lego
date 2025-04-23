import { Badge } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function AnswerHeader() {
  const [liked, setLiked] = useState<boolean>(false); // likeState 서버에서 받아온 값

  const handleToggleLike = () => {
    setLiked((prev) => !prev);
  };
  return (
    <>
      <header className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <Badge>Javascript</Badge>
          <p className="txt-3xl-b text-[var(--gray-02)]">HTTP 메소드에 대한 설명</p>
        </div>
        <div
          className="flex items-center justify-center w-[32px] h-[32px]"
          onClick={handleToggleLike}
        >
          <Image
            src={`/assets/icons/like${liked ? "_fill" : ""}.svg`}
            alt="like icon"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>
      </header>
    </>
  );
}
