"use client";

export default function LikeAnswer() {
  return (
    <>
      <div
        className="px-[36px] py-[24px] border-1 border-gray rounded-lg"
        style={{ background: "var(--blue-04)" }}
      >
        <div className="flex items-center mb-[16px]">
          {/* <img className="w-[36px] h-[36px] rounded-full mr-[18px] bg-[var(--gray-01)]" /> */}
          <p className="w-[824px] h-[56px]">
            Next.js는 버전 13부터 React 18에서 도입된 서버 컴포넌트를 지원하고 있습니다. 시간이
            흐르면서 많은 분이 이를 익숙하게 활용하고 있지만, 저처럼 개념 고 있지만, 저처럼 개념고
            있지만, 저처럼 개념고 있지만, 저처럼 개념고 있지만, 저처럼 개념고 있지만, 저..
          </p>
        </div>
        <div>
          <span className="mr-[8px]">작성자이름 </span>
          <span>2025.04.17 </span>
        </div>
      </div>
    </>
  );
}
