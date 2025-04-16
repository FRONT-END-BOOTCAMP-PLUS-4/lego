"use client";
import AdminHeader from "../components/AdminHeader";

export default function AdminQuestionListPage() {
  return (
    <div>
      {/* 헤더 컴포넌트 출력 */}
      <AdminHeader />
      <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
        <h1>관리자 질문 리스트 관리</h1>
        {/* 질문 리스트 관리 내용 추가 */}
      </div>
    </div>
  );
}
