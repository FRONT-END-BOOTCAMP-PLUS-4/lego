"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useProfileStore } from "@/store/useProfileStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { User, LogOut } from "lucide-react";
import MailAlertButton from "./MailAlert";

export default function Header() {
  const router = useRouter();
  const { isLoggedIn, logout, user } = useAuthStore();
  const { showSubscribeAlert, setShowSubscribeAlert } = useProfileStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.origin) return;
      const { token } = event.data;

      if (token) {
        useAuthStore.getState().login(token);
        router.replace("/");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router]);

  // 메인페이지 이메일 공개 toast UI 안내가 필요한 경우 활성화
  // useEffect(() => {
  //   if (isLoggedIn && user && !emailCheck.current) {
  //     const timeout = setTimeout(() => {
  //       if (!user.email) {
  //         toast(<p className="txt-lg-b">이메일을 공개해주세요!</p>, {
  //           description: (
  //             <div className="txt-md">
  //               클릭 시 GitHub 이메일 설정으로 이동합니다.
  //               <br />
  //               ⚠️ 변경 사항이 적용되기까지 시간이 조금 걸릴 수 있어요.
  //             </div>
  //           ),
  //           action: {
  //             label: "이동하기",
  //             onClick: () => {
  //               window.open("https://github.com/settings/emails", "_blank");
  //             },
  //           },
  //           duration: Infinity,
  //         });
  //       }
  //     }, 1000);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [isLoggedIn, user]);

  // 이미 구독 중이면 toast UI
  useEffect(() => {
    if (showSubscribeAlert) {
      toast(<p className="txt-lg-b">이미 구독 중입니다 😎</p>, {
        description: <p className="txt-md">더 많은 기술면접 질문을 확인해보세요!</p>,
        action: {
          label: "이동하기",
          onClick: () => {
            router.push("/questions");
          },
        },
        duration: 5000,
      });

      setShowSubscribeAlert(false);
    }
  }, [showSubscribeAlert, router, setShowSubscribeAlert]);

  return (
    <header className="sticky top-0 z-50 bg-[var(--blue-04)] flex justify-between items-center h-[10vh] px-20 py-4 shadow-md">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      </Link>
      <nav className="flex items-center gap-3">
        <MailAlertButton />

        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src={user?.avatarUrl || "/assets/image/default-avatar.svg"}
                  width={30}
                  height={30}
                  alt="profile image"
                  className="rounded-xl"
                />
                <p>{user?.nickname}님</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push("/users")}>
                <User />
                마이 페이지
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut />
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <Button variant="ghost">로그인/회원가입</Button>
          </Link>
        )}
      </nav>

      {/* <AlertDialog open={showSubscribeAlert} onOpenChange={setShowSubscribeAlert}>
        <AlertDialogContent className="flex flex-col items-center">
          <AlertDialogTitle>이미 구독 중입니다</AlertDialogTitle>
          <AlertDialogAction
            onClick={() => {
              setShowSubscribeAlert(false);
            }}
            className="w-2/6 bg-[var(--blue-02)] border-none"
          >
            이동하기
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog> */}
    </header>
  );
}
