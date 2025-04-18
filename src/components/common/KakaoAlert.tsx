"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function KakaoAlertButton() {
  const router = useRouter();

  const handleKakao = () => {
    router.push("/users");
  };

  return (
    <button
      onClick={handleKakao}
      className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#fee500] cursor-pointer hover:-translate-y-1 transition-transform duration-300"
    >
      <Image src="/assets/icons/kakao.svg" alt="카카오톡 아이콘" width={20} height={20} />
      <span>알림 받기</span>
    </button>
  );
}
