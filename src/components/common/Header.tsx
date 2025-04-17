"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--blue-04)] flex justify-between items-center px-10 py-4 shadow-md">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      </Link>

      <Link href="/login">
        {isLoggedIn ? (
          <Button variant="ghost" onClick={handleLogout}>
            로그아웃
          </Button>
        ) : (
          <Button variant="ghost">로그인/회원가입</Button>
        )}
      </Link>
    </header>
  );
}
