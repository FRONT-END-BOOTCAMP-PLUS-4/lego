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
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>관리자 로그인</h1>
      {!isLoggedIn ? (
        // 로그인 폼 표시
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "10px", fontSize: "16px" }}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "10px", fontSize: "16px" }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            type="submit"
            style={{
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            로그인
          </button>
        </form>
      ) : (
        // 로그인 성공 시 버튼 표시
        <Link
          href="/admin/questions"
          style={{
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "#0070f3",
            color: "white",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          질문 페이지로 이동
        </Link>
      )}
    </div>
  );
}