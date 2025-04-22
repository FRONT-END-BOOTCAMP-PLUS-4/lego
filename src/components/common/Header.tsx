"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
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

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const emailCheck = useRef(false);

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
    if (isLoggedIn && user && !emailCheck.current) {
      const timeout = setTimeout(() => {
        if (!user.email) {
          toast(<p className="txt-lg-b">이메일을 공개해주세요!</p>, {
            description: (
              <div className="txt-md">
                클릭 시 GitHub 이메일 설정으로 이동합니다.
                <br />
                ⚠️ 변경 사항이 적용되기까지 시간이 조금 걸릴 수 있어요.
              </div>
            ),
            action: {
              label: "이동하기",
              onClick: () => {
                window.open("https://github.com/settings/emails", "_blank");
              },
            },
            duration: Infinity,
          });
        }
      }, 1000); // 1초 지연

      return () => clearTimeout(timeout);
    }
  }, [isLoggedIn, user]);

  return (
    <header className="sticky top-0 z-50 bg-[var(--blue-04)] flex justify-between items-center h-[10vh] px-20 py-4 shadow-md">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      </Link>

      {isLoggedIn ? (
        <nav className="flex items-center gap-6">
          <MailAlertButton />
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
        </nav>
      ) : (
        <Link href="/login">
          <Button variant="ghost">로그인/회원가입</Button>
        </Link>
      )}
    </header>
  );
}
