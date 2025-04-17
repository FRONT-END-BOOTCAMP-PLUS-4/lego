"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      setIsLoggedIn(true); // 로그인 성공 시 상태 업데이트
    } catch (err: any) {
      setError(err.message || "알 수 없는 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-card text-card-foreground rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">관리자 로그인</h1>
      {!isLoggedIn ? (
        // 로그인 폼 표시
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
          <button
            type="submit"
            className="p-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
          >
            로그인
          </button>
        </form>
      ) : (
        // 로그인 성공 시 버튼 표시
        <Link
          href="/admin/questions"
          className="block p-3 bg-primary text-primary-foreground rounded-md text-center hover:bg-primary/90 transition"
        >
          질문 페이지로 이동
        </Link>
      )}
    </div>
  );
}