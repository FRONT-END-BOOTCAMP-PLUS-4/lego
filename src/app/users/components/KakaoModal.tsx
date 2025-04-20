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

interface KakaoModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function KakaoModal({ open, onClose, onConfirm }: KakaoModalProps) {
  const handleSubscribe = () => {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL!}/auth/kakao/callback`;
    const scope = "talk_message";

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    window.location.href = kakaoAuthUrl;
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>카카오톡 알림을 설정하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            매일 아침 기술면접 질문을 카카오톡으로 받아볼 수 있어요 😃
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              // onConfirm();
              handleSubscribe();
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
