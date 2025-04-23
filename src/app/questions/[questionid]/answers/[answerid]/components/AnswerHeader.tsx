import { Badge } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AnswerHeader() {
  const [isLike, setisLike] = useState<boolean>(false); // likeState 서버에서 받아온 값

  // const handleToggleLike = () => {
  //   setLiked((prev) => !prev);
  // };

  // const handleToggleLike = async () => {
  //   const newState = !isLike;
  //   const method = newState ? "POST" : "DELETE";
  //   const formData = {
  //     userId: userEmail,
  //     questionId,
  //   };
  //   if (!currentUser) {
  //     return router.push("/login");
  //   }

  //   try {
  //     const response = await fetch("/api/bookmarks", {
  //       method,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) {
  //       throw new Error(newState ? "좋아요 실패" : "좋아요 해제 실패");
  //     }
  //     setisLike(newState);
  //     toast.success(newState ? "좋아요 등록." : "좋아요 해제되었습니다.");
  //   } catch (error) {
  //     toast.error(`${(error as Error).message}`);
  //   }
  // };

  return (
    <>
      <header className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <Badge>Javascript</Badge>
          <p className="txt-3xl-b text-[var(--gray-02)]">HTTP 메소드에 대한 설명</p>
        </div>
        <div
          className="flex items-center justify-center w-[32px] h-[32px]"
          // onClick={handleToggleLike}
        >
          <Image
            src={`/assets/icons/like${isLike ? "_fill" : ""}.svg`}
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
