"use client";

import { useState } from "react";
import { UnderlineTab } from "@/components/ui/underLinetab";
import Profile from "./components/Profile";
import Activity from "./components/Activity";

export default function Mypage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activityKey, setActivityKey] = useState(0);
  const redirectHandler = (value: number) => {
    setActiveIndex(value);

    if (value === 0) {
      setActivityKey((prev) => prev + 1);
    }
  };

  return (
    <section className="w-[980px] h-[660px]  m-auto">
      <h2 className="txt-2xl-b mt-[var(--space-40)] mb-[50px]">마이 페이지</h2>
      <UnderlineTab
        item={["나의 활동", "계정 관리"]}
        activeIndex={activeIndex}
        setActiveIndex={redirectHandler}
      >
        {activeIndex === 0 && <Activity key={activityKey} />}
        {activeIndex === 1 && <Profile />}
      </UnderlineTab>
    </section>
  );
}
