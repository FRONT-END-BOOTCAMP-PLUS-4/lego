"use client";

import { useRouter } from "next/navigation";
import { useHandleMail } from "@/utils/handleMail";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useProfileStore } from "@/store/useProfileStore";
import { Mail } from "lucide-react";

export default function MailAlertButton() {
  const { showLoginAlert, setShowLoginAlert } = useProfileStore();
  const handleMail = useHandleMail();
  const router = useRouter();

  return (
    <>
      <button
        onClick={handleMail}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--blue-03)] cursor-pointer hover:-translate-y-1 transition-transform duration-300"
      >
        <Mail fill="white" />
        <span>메일 받기</span>
      </button>

      <AlertDialog open={showLoginAlert} onOpenChange={setShowLoginAlert}>
        <AlertDialogContent className="flex flex-col items-center">
          <AlertDialogTitle>로그인이 필요합니다</AlertDialogTitle>
          <AlertDialogDescription>
            구독하고 매일 기술면접 질문을 받아보세요 😃
          </AlertDialogDescription>
          <AlertDialogAction
            onClick={() => {
              setShowLoginAlert(false);
              router.push("/login");
            }}
            className="w-2/6 bg-[var(--blue-02)] border-none"
          >
            이동하기
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
