"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";

export default function Header() {
  const router = useRouter();
  const { isLoggedIn, logout, user } = useAuthStore();

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
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[var(--blue-04)] flex justify-between items-center px-10 py-4 shadow-md">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      </Link>

      {isLoggedIn ? (
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Image
              src={user?.avatarUrl || "/default-avatar.png"}
              width={30}
              height={30}
              alt="profile image"
              className="rounded-xl"
            />
            <p>{user?.name}님 환영해요!</p>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            로그아웃
          </Button>
        </div>
      ) : (
        <Link href="/login">
          <Button variant="ghost">로그인/회원가입</Button>
        </Link>
      )}
    </header>
  );
}
