"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/store/useAuthStore";
import { useProfileStore } from "@/store/useProfileStore";

interface MailModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function MailModal({ open, onClose, onConfirm }: MailModalProps) {
  const { user } = useAuthStore();
  const { setShowModal } = useProfileStore();

  const handleSubscribe = async () => {
    setShowModal(true);
    try {
      // 토글 on - 구독 등록
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>소셜 계정으로 간편하게!</AlertDialogTitle>
          <AlertDialogDescription>
            매일 아침 기술면접 질문을 메일로 간편하게 받아볼 수 있어요 😃
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleSubscribe();
              onConfirm();
            }}
          >
            구독하기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
