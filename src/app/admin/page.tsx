"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // useRouter 가져오기
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // useRouter 초기화

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !password) {
      setError("이름과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "로그인에 실패했습니다.");
      }

      const data = await response.json();
      console.log("로그인 성공:", data);

      // 로그인 성공 시 바로 페이지 이동
      router.push("/admin/questions");
    } catch (err: any) {
      setError(err.message || "알 수 없는 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-card text-card-foreground rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">관리자 로그인</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {error && <p className="text-destructive text-sm">{error}</p>}
        <Button
          type="submit"
        >
          로그인
        </Button>
      </form>
    </div>
  );
}
