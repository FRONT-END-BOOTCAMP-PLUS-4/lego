"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    // 서버에서 쿠키 삭제 요청
    await fetch("/api/admin/logout", { method: "POST" });

    // 클라이언트에서 쿠키 삭제 (추가 안전장치)
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    alert("로그아웃 되었습니다.");
    // 로그아웃 후 로그인 페이지로 이동
    router.push("/admin");
  };

  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", backgroundColor: "#f5f5f5" }}>
      <h1>관리자 페이지</h1>
      <Button onClick={handleLogout}>로그아웃</Button>
    </header>
  );
}