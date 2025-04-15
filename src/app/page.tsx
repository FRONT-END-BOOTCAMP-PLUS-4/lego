"use client";

import { Pagination } from "@/components/ui/pagination";
import { useState } from "react";

export default function Home() {
  const [currentPageBlock, setCurrentPageBlock] = useState(1);
  const [pageNumber, setPage] = useState(1);
  return (
    <>
      <Pagination
        currentPageBlock={currentPageBlock}
        pageNumber={pageNumber}
        handleMovePageBlock={(block) => setCurrentPageBlock(block)}
        handleMovePage={(page) => setPage(page)}
      />
    </>
  );
}
