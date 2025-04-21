"use client";

import { useRouter } from "next/navigation";
import { useProfileStore } from "@/store/useProfileStore";

export function useHandleMail() {
  const { setActiveIndex, setMailAutoToggle } = useProfileStore();
  const router = useRouter();

  const handleMail = () => {
    setActiveIndex(0);
    router.push("/users");
    setMailAutoToggle(true);
  };

  return handleMail;
}
