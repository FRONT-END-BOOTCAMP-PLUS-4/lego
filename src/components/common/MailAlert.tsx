"use client";

import { useRouter } from "next/navigation";
import { useHandleMail } from "@/utils/handleMail";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useProfileStore } from "@/store/useProfileStore";
import { Mail } from "lucide-react";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

export default function MailAlertButton() {
  const { showLoginAlert, setShowLoginAlert } = useProfileStore();
  const handleMail = useHandleMail();
  const router = useRouter();

  return (
    <>
      <button
        onClick={handleMail}
        className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-sm bg-[var(--blue-03)] hover:scale-105 transition-transform duration-300 "
      >
        <Mail fill="white" className="w-6 h-6 text-[var(--gray-02)] stroke-[1.5]" />
        <span className="txt-sm">메일 받기</span>
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
          >
            이동하기
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
