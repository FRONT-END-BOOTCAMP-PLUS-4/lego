"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const provider = searchParams.get("provider");

    if (!code || !provider) return;

    const login = async () => {
      try {
        const res = await fetch(`/api/auth/${provider}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        const { token } = await res.json();

        if (token) {
          localStorage.setItem("token", token);
        } else {
          console.error("토큰이 없습니다.");
        }
      } catch (error) {
        console.error("로그인 실패:", error);
      }
    };

    login();
  }, [searchParams, router]);

  return <div className="text-center py-20 text-lg">로그인 처리 중입니다...</div>;
}
