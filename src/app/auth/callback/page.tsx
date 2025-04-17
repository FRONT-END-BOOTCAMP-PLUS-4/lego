"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function OAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const code = searchParams.get("code");
    const provider = searchParams.get("provider");

    if (!code || !provider) return;

    const loginProcess = async () => {
      try {
        const res = await fetch(`/api/auth/${provider}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        const { token } = await res.json();

        if (token && window.opener) {
          // login(token);
          // router.replace("/");
          window.opener.postMessage({ token }, window.origin);
          window.close();
        } else {
          console.error("토큰이 없습니다.");
        }
      } catch (error) {
        console.error("로그인 실패:", error);
      }
    };

    loginProcess();
  }, [searchParams, router, login]);

  return <div className="text-center py-20 text-lg">로그인 처리 중입니다...</div>;
}
