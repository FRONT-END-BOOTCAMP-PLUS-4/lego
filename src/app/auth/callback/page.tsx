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

        console.log(provider);
        console.log(res);

        const { token } = await res.json();

        if (token && window.opener) {
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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500" />
      <span className="ml-4 text-blue-500 text-lg">Loading...</span>
    </div>
  );
}
