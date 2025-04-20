"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function KakaoCallbackPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      // access_token 요청
      fetch(`/api/kakao/token?code=${code}`).then((res) =>
        res.json().then((data) => {
          console.log("✅ Access Token 발급 결과:", data);
        })
      );
    }
  }, [code]);

  return <p>카카오 되나 볼까</p>;
}
