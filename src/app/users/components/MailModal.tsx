"use client";

import { SubscribeUsecase } from "@/application/subscribe/SubscribeUsecase";
import { SbSubscribeRepository } from "@/infra/repositories/supabase/SbSubscribeRepository";
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

interface MailModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function MailModal({ open, onClose, onConfirm }: MailModalProps) {
  // const { user } = useAuthStore();

  // const subscribeUsecase = new SubscribeUsecase(new SbSubscribeRepository());
  // const handleToggle = async (checked: boolean) => {
  //   if (checked) {
  //     await subscribeUsecase.subscribe(user?.email);
  //     // setSubscribed(true);
  //   } else {
  //     await subscribeUsecase.unsubscribe(user?.email);
  //     // setSubscribed(false);
  //   }
  // };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>메일 알림을 설정하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            매일 아침 기술면접 질문을 메일로 간편하게 받아볼 수 있어요 😃
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            구독하기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
