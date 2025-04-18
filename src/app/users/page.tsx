"use client";

import { useProfileStore } from "@/store/useProfileStore";
import { UnderlineTab } from "@/components/ui/underLinetab";
import Profile from "./components/Profile";
import Activity from "./components/Activity";
import { useState } from "react";

export default function Mypage() {
  const { activeIndex, setActiveIndex } = useProfileStore();
  const [activityKey, setActivityKey] = useState(0);

  const redirectHandler = (value: number) => {
    setActiveIndex(value);
    if (value === 0) setActivityKey((prev) => prev + 1);
  };

  const tabList = ["나의 활동", "계정 관리"];

  return (
    <section className="w-full max-w-[946px] mx-auto px-4 sm:px-6 lg:px-0 mt-[var(--space-40)]">
      <h2 className="txt-2xl-b mb-[var(--space-50)]">마이 페이지</h2>
      <UnderlineTab
        item={tabList}
        activeIndex={activeIndex}
        setActiveIndex={redirectHandler}
        className="mb-[var(--space-50)]"
      >
        {activeIndex === 0 && <Activity key={activityKey} />}
        {activeIndex === 1 && <Profile />}
      </UnderlineTab>
    </section>
  );
}
