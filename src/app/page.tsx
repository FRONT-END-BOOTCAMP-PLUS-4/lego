"use client";

import { Pagination } from "@/components/ui/pagination";
import { useState } from "react";

export default function Home() {
  const [currentPageBlock, setCurrentPageBlock] = useState(1);
  return (
    <>
      <Pagination
        currentPageBlock={currentPageBlock}
        handleMovePageBlock={(page) => setCurrentPageBlock(page)}
      />
    </>
  );
}
