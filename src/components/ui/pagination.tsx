"use client";
import * as React from "react";
interface PaginationProps extends React.ComponentProps<"div"> {
  currentPage?: number;
  totalPage?: number;
}

interface HandlePage {
  (pageNumber: number, direction?: "prev" | "next"): void;
}

export function Pagination({ totalPage = 5, ...props }: PaginationProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const handleMovePage: HandlePage = (pageNumber, direction) => {
    if (direction) {
      setCurrentPage((prev) => {
        if (direction === "prev") return Math.max(prev - 1, 1);
        if (direction === "next") return Math.min(prev + 1, totalPage);
        return prev;
      });
    } else {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center pt-[150px] pb-[100px]" {...props}>
        <span
          className="w-6 cursor-pointer h-6 bg-no-repeat bg-center bg-contain bg-[url('/assets/icons/left.svg')] opacity-30 hover:opacity-60"
          onClick={() => handleMovePage(currentPage, "prev")}
        ></span>
        <ul className="flex mx-4 ">
          {Array.from({ length: totalPage }).map((_, page) => {
            return (
              <li
                key={page + 1}
                onClick={() => handleMovePage(page + 1)}
                className={`px-3 cursor-pointer txt-sm py-1 border rounded-sm text-[var(--gray-02)] hover:text-[var(--black)] ${page + 1 === currentPage ? "border-[var(--gray-01)] txt-sm-b !text-[var(--black)] " : "border-transparent"}`}
              >
                {page + 1}
              </li>
            );
          })}
        </ul>
        <span
          className="w-6 cursor-pointer h-6 bg-no-repeat bg-center bg-contain bg-[url('/assets/icons/right.svg')] opacity-30 hover:opacity-60"
          onClick={() => handleMovePage(currentPage, "next")}
        ></span>
      </div>
    </>
  );
}
