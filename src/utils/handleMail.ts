"use client";

import { useRouter } from "next/navigation";
import { useProfileStore } from "@/store/useProfileStore";

export function useHandleMail() {
  const { mailAutoToggle, setActiveIndex, setShowModal } = useProfileStore();
  const router = useRouter();

  const handleMail = () => {
    router.push("/users");
    if (!mailAutoToggle) {
      setActiveIndex(0);
      setShowModal(true);
    }
  };

  return handleMail;
}
