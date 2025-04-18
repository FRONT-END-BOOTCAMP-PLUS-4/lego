"use client";

export default function Comment() {
  return (
    <>
      <div
        className="w-[950px] h-[100px] rounded-lg border-1 border-gray px-[36px] py-[24px]"
        style={{ background: "var(--blue-04)" }}
      >
        <div className="w-[878px] h-[54px]">
          <p className="mb-[4px] txt-base">나의 댓글 내용 {/*댓글 정보 가져오기*/}</p>
          <span className="txt-sm" style={{ color: "var(--gray-02)" }}>
            게시글 제목 {/*게시글 제목 가져오기*/}
          </span>
        </div>
      </div>
    </>
  );
}
