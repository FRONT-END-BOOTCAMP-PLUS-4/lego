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

  useEffect(() => {
    if (isLoggedIn && user) {
      const timeout = setTimeout(() => {
        if (!user.email) {
          toast(<p className="txt-lg-b">이메일을 공개해주세요!</p>, {
            description: (
              <div className="txt-md !text-[var(--gray-02)]">
                <p>&#40;Public Profile &#45;&gt; Public email 설정&#41;</p>
                <br />
                <p>⚠️ 변경 후 다시 로그인해주세요.</p>
              </div>
            ),
            action: {
              label: "이동하기",
              onClick: () => {
                window.open("https://github.com/settings/profile", "_blank");
              },
            },
            duration: Infinity,
          });
        }
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isLoggedIn, user]);

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
    <header className="sticky top-0 z-50 bg-[var(--blue-04)] flex justify-between items-center h-[80px] px-3 md:px-20 border-b border-[#edf2f7]">
      <Link href="/" className="flex items-center ">
        <Image src="/logoImg.svg" alt="Logo charactor" width={50} height={50} />
        <Image
          src="/logo.png"
          alt="Logo"
          width={80}
          height={80}
          className="self-center opacity-95"
        />
      </Link>
      <nav className="flex items-center gap-4">
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
            <DropdownMenuContent align="end" className="mt-1">
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
            <Button variant="ghost" className="!px-2">
              로그인 / 회원가입
            </Button>
          </Link>
        )}
      </nav>
    </header>
  );
}
