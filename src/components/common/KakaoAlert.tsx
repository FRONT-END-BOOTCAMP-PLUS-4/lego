"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/store/useProfileStore";

export default function KakaoAlertButton() {
  const { setActiveIndex, setKakaoAutoToggle } = useProfileStore();
  const router = useRouter();

  const handleKakao = () => {
    setActiveIndex(0);
    router.push("/users");
    setKakaoAutoToggle(true);
  };

  return (
    <button
      onClick={handleKakao}
      className="flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--yellow)] cursor-pointer hover:-translate-y-1 transition-transform duration-300"
    >
      <Image src="/assets/icons/kakao.svg" alt="카카오톡 아이콘" width={20} height={20} />
      <span>알림 받기</span>
    </button>
  );
}
