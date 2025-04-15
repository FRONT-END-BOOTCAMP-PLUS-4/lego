"use client";
import * as React from "react";
interface PaginationProps extends React.ComponentProps<"div"> {
  totalCount: number;
  itemsPerPage: number;
  pages: number;
  pageNumber: number;
  currentPageBlock: number;
  handleMovePageBlock: (newBlock: number) => void;
  handleMovePage: (page: numebr) => void;
}
interface MovePageBlock {
  (btnType: string): void;
}
interface HandlePage {
  (currentPage: number): void;
}
//supabase에서 data, total count 받음

export function Pagination({
  pageNumber = 1,
  totalCount = 100, //전체 데이터 개수
  currentPageBlock = 1, //현재 페이지 번호
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

  return (
    <>
      <div className="flex justify-center items-center pt-[150px] pb-[100px]">
        <span
          className="w-6 cursor-pointer h-6 bg-no-repeat bg-center bg-contain bg-[url('/assets/icons/left.svg')] opacity-30 hover:opacity-60"
          onClick={() => handleMoveBlock("prev")}
        ></span>
        <ul className="flex mx-4 min-w-50">
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
        <span
          className="w-6 cursor-pointer h-6 bg-no-repeat bg-center bg-contain bg-[url('/assets/icons/right.svg')] opacity-30 hover:opacity-60"
          onClick={() => handleMoveBlock("next")}
        ></span>
      </div>
    </>
  );
}
