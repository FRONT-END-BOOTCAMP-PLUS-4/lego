import AnswerHeader from "./AnswerHeader";
import { useAuthStore } from "@/store/useAuthStore";

export default function AnswerContents() {
  const { user } = useAuthStore();
  console.log(user);
  const userId = user?.email;

  /*
  문제 id 랑 작성자 id 로 제목, 답변, 카테고리
  로그인 한 유저의 해당 답변에 대한 좋아요 여부 데이터 필요, 
  */
  return (
    <>
      <AnswerHeader />
      {/* 작성자 정보 */}
      <div className="flex items-center gap-4 mt-6">
        <span className="w-[36px] h-[36px] inline-block bg-[var(--gray-01)] rounded-full shrink-0"></span>
        {/* 작성자 정보 */}
        <div>
          <div className="text-sm mb-1 font-bold text-[var(--gray-02)]">작성자 이름</div>
          <div className="text-xs text-[var(--gray-02)]">2025.02.28</div>
        </div>
      </div>

      {/* 본문 (예시 텍스트) */}
      <div className="mt-[30px] text-base leading-[2]">
        Next.js는 버전 13부터 React 18에서 도입된 서버 컴포넌트를 지원하고 있습니다. 시간이 흐르면서
        많은 분이 이를 익숙하게 활용하고 있지만, 저처럼 개념을 충분히 이해하지 못한 채 습관적으로
      </div>
    </>
  );
}
