"use client";

import { useRouter } from "next/navigation";
import { useProfileStore } from "@/store/useProfileStore";

export function useHandleKakao() {
  const { setActiveIndex, setKakaoAutoToggle } = useProfileStore();
  const router = useRouter();

  const handleKakao = () => {
    setActiveIndex(0);
    router.push("/users");
    setKakaoAutoToggle(true);
  };

  return handleKakao;
}
