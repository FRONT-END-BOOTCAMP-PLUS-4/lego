"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useProfileStore } from "@/store/useProfileStore";

export function useHandleMail() {
  const { user } = useAuthStore();
  const { mailAutoToggle, setActiveIndex, setShowModal, setShowLoginAlert, setShowSubscribeAlert } =
    useProfileStore();
  const router = useRouter();

  const handleMail = () => {
    if (!user) {
      setShowLoginAlert(true);
      return null;
    }

    if (!mailAutoToggle) {
      setActiveIndex(0);
      router.push("/users");
      setShowModal(true);
    } else {
      setShowSubscribeAlert(true);
    }
  };

  return handleMail;
}
