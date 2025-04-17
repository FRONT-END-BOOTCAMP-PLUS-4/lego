"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { TextArea } from "@/components/ui/textArea"


export default function AnswerDetailPage() {
  // Mock data for comments
  // 실제 데이터는 API 호출 등을 통해 가져와야 합니다.
  const comments = Array(50)
    .fill(null)
    .map((_, i) => ({
      id: i + 1,
      author: `작성자 ${i + 1}`,
      content: `댓글 내용 ${i + 1}`,
      date: `2025.03.${(i % 30) + 1}`,
    }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleMovePage = (page: number) => {
    setCurrentPage(page);
  };

  const currentComments = comments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [liked, setLiked] = useState(false);

  const handleToggleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <div className="w-[1272px] container mx-auto pt-[40px] md:px-6">
      <div className="pb-[var(--space-24)] txt-2xl-b">답변 상세보기</div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <Badge>Javascript</Badge>
          <p className="txt-3xl-b text-[var(--gray-02)]">
            HTTP 메소드에 대한 설명
          </p>
        </div>
        <div
          className="flex items-center justify-center w-[32px] h-[32px]"
          onClick={handleToggleLike}
        >
          <Image
            src={`/assets/icons/like${liked ? "_fill" : ""}.svg`}
            alt="like icon"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* 작성자 정보 */}
      <div className="flex items-center gap-4 mt-6">
        <span className="w-[36px] h-[36px] inline-block bg-[var(--gray-01)] rounded-full shrink-0"></span>

        {/* 작성자 정보 */}
        <div>
          <div className="text-sm mb-1 font-bold text-[var(--gray-02)]">
            작성자 이름
          </div>
          <div className="text-xs text-[var(--gray-02)]">2025.02.28</div>
        </div>
      </div>

      {/* 본문 (예시 텍스트) */}
      <div className="mt-[30px] text-base leading-[2]">
       Next.js는 버전 13부터 React 18에서 도입된 서버 컴포넌트를 지원하고 있습니다. 시간이 흐르면서 많은 분이 이를 익숙하게 활용하고 있지만, 저처럼 개념을 충분히 이해하지 못한 채 습관적으로 사용하는 경우도 있을 텐데요. 이러한 고민을 가진 분들을 위해, 서버 컴포넌트의 개념과 동작 원리를 자세히 다룬 글을 소개합니다.
이 글에서는 서버 컴포넌트를 깊이 있게 탐구합니다. 컴포넌트 렌더링 방식의 변천사를 살펴보며 서버 컴포넌트가 도입된 배경을 설명하고, 리액트 생명주기에 미치는 영향과 스트리밍을 통한 성능 개선 효과 등을 면밀히 분석합니다. 다소 긴 글이지만, 흐름을 따라가다 보면 자연스럽게 서버 컴포넌트에 대한 이해가 깊어질 것입니다.
Next.js는 버전 13부터 React 18에서 도입된 서버 컴포넌트를 지원하고 있습니다. 시간이 흐르면서 많은 분이 이를 익숙하게 활용하고 있지만, 저처럼 개념을 충분히 이해하지 못한 채 습관적으로 사용하는 경우도 있을 텐데요. 이러한 고민을 가진 분들을 위해, 서버 컴포넌트의 개념과 동작 원리를 자세히 다룬 글을 소개합니다.
이 글에서는 서버 컴포넌트를 깊이 있게 탐구합니다. 컴포넌트 렌더링 방식의 변천사를 살펴보며 서버 컴포넌트가 도입된 배경을 설명하고, 리액트 생명주기에 미치는 영향과 스트리밍을 통한 성능 개선 효과 등을 면밀히 분석합니다. 다소 긴 글이지만, 흐름을 따라가다 보면 자연스럽게 서버 컴포넌트에 대한 이해가 깊어질 것입니다.
Next.js는 버전 13부터 React 18에서 도입된 서버 컴포넌트를 지원하고 있습니다. 시간이 흐르면서 많은 분이 이를 익숙하게 활용하고 있지만, 저처럼 개념을 충분히 이해하지 못한 채 습관적으로 사용하는 경우도 있을 텐데요. 이러한 고민을 가진 분들을 위해, 서버 컴포넌트의 개념과 동작 원리를 자세히 다룬 글을 소개합니다.
이 글에서는 서버 컴포넌트를 깊이 있게 탐구합니다. 컴포넌트 렌더링 방식의 변천사를 살펴보며 서버 컴포넌트가 도입된 배경을 설명하고, 리액트 생명주기에 미치는 영향과 스트리밍을 통한 성능 개선 효과 등을 면밀히 분석합니다. 다소 긴 글이지만, 흐름을 따라가다 보면 자연스럽게 서버 컴포넌트에 대한 이해가 깊어질 것입니다.
등을 면밀히 분석합니다. 다소 긴 글이지만, 흐름을 따라가다 보면 자연스럽게 서버 컴포넌트에 대한 이해가 깊어질 것입니다.
        </div>

      {/* 본문과 텍스트 사이의 패딩 */}
      <div className="mb-[150px]"></div>

      {/* 댓글 입력 영역 */}
      <div className="mt-[40px] mb-[16px]">
        <label className="txt-sm-b" htmlFor="comment" >
          <span className="text-[var(--gray-02)]">댓글 수 </span>
          <span className="text-black">{comments.length}</span>
        </label>
        <div className="mb-[10px]" />

        <div className="flex gap-2">
          {/* 좌측 박스: 작성자 + 입력창 */}
          <TextArea placeholder="Type your message here" />
          <Button
            className="w-[80px] h-[120px]"
            variant="outline"
          >
            등록
          </Button>
        </div>
      </div>

      {/* 본문과 텍스트 사이의 패딩 */}
      <div className="mb-[58px]"></div>

      {/* 댓글 리스트 */}
      <div className="mt-[30px] space-y-8">
        {currentComments.map((comment) => (
          <div key={comment.id} className="border-b pb-4 flex gap-4">
            {/* 프로필 이미지 */}
            <span className="w-[36px] h-[36px] inline-block bg-[var(--gray-01)] rounded-full shrink-0"></span>

            {/* 댓글 내용 */}
            <div className="flex-1">
              <div className="text-sm font-bold mb-1">{comment.author}</div>
              <div className="text-base mb-1">{comment.content}</div>
              <div className="text-xs text-[var(--gray-02)]">{comment.date}</div>
            </div>

            {/* 수정/삭제 버튼 */}
            <div className="flex items-start gap-2">
              <Button variant="ghost" size="default">
                수정
              </Button>
              <Button variant="ghost" size="default">
                삭제
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <Pagination
        totalCount={comments.length}
        itemsPerPage={itemsPerPage}
        pageNumber={currentPage}
        currentPageBlock={currentPage}
        handleMovePageBlock={() => {}}
        handleMovePage={handleMovePage}
      />
    </div>
  );
}