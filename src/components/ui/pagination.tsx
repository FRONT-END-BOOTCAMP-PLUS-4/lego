"use client";
import * as React from "react";
//supabase에서 data, total count 받음

interface PaginationProps extends React.ComponentProps<"div"> {
  totalCount: number;
  itemsPerPage: number;
  pages: number;
  pageNumber: number;
  currentPageBlock: number;
  handleMovePageBlock: (newBlock: number) => void;
  handleMovePage: (page: number) => void;
}
interface MovePageBlock {
  (btnType: string): void;
}
interface HandlePage {
  (currentPage: number): void;
}

export function Pagination({
  pageNumber = 1, //현재 페이지 번호
  totalCount = 0, //전체 데이터 개수
  currentPageBlock = 1, //현재 블록 순서
  itemsPerPage = 6, //한 페이지당 보여줄 데이터 수
  handleMovePageBlock = () => {},
  handleMovePage = () => {},
}: PaginationProps) {
  const visiblePageCount = 5;
  const endPage = Math.ceil(totalCount / itemsPerPage); //마지막 보여줄 페이지 번호들
  const startNumber = Math.floor((currentPageBlock - 1) / visiblePageCount) * visiblePageCount + 1;
  const pages = Array.from({ length: visiblePageCount }, (_, i) => startNumber + i).filter(
    (page) => page <= endPage
  );

  // 다음페이지가 없으면 비활성화
  const hasNextPage = startNumber + (visiblePageCount - 1) < endPage; // 다음 페이지 존재 여부

  const hasPreviousPage = pageNumber > visiblePageCount; // 이전 페이지 존재 여부
  console.log("hasPreviousPage", hasPreviousPage);
  const handlePage: HandlePage = (currentPage) => {
    handleMovePage(currentPage);
  };
  const handleMoveBlock: MovePageBlock = (btnType) => {
    if (btnType === "prev" && currentPageBlock > 1) {
      const newBlock = currentPageBlock - visiblePageCount;
      handleMovePageBlock(newBlock);
      handlePage(newBlock);
    }
    if (btnType === "next" && currentPageBlock + visiblePageCount <= endPage) {
      const newBlock = currentPageBlock + visiblePageCount;
      handleMovePageBlock(newBlock);
      handlePage(newBlock);
    }
  };
  if (!totalCount) {
    return;
  }
  return (
    <>
      <div className="flex justify-center items-center pt-[150px] pb-[100px]">
        <button
          className="w-6 cursor-pointer h-6 bg-no-repeat bg-center bg-contain bg-[url('/assets/icons/left.svg')] opacity-30 hover:opacity-60 disabled:opacity-10"
          onClick={() => handleMoveBlock("prev")}
          disabled={!hasPreviousPage}
        ></button>
        <ul className="flex mx-4">
          {pages.map((page) => {
            return (
              <li
                key={page}
                onClick={() => handlePage(page)}
                className={`w-[40px] flex justify-center cursor-pointer txt-sm py-1 border rounded-sm text-[var(--gray-02)] hover:text-[var(--black)] ${page === pageNumber ? "border-[var(--gray-01)] txt-sm-b !text-[var(--black)] " : "border-transparent"}`}
              >
                {page}
              </li>
            );
          })}
        </ul>
        <button
          className={`w-6 cursor-pointer h-6 bg-no-repeat bg-center bg-contain bg-[url('/assets/icons/right.svg')] opacity-30 hover:opacity-60 disabled:opacity-10 `}
          onClick={() => handleMoveBlock("next")}
          disabled={!hasNextPage}
        ></button>
      </div>
    </>
  );
}
