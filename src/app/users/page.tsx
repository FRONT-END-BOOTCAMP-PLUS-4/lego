"use client";

import { useState } from "react";
import { useProfileStore, MypageTabType } from "@/store/useProfileStore";
import { UnderlineTab } from "@/components/ui/underLinetab";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Profile from "./components/Profile";
import Activity from "./components/Activity";

export default function Mypage() {
  const { activeIndex, setActiveIndex, selectedYear, setSelectedYear } = useProfileStore();
  const [activityKey, setActivityKey] = useState(0);

  const redirectHandler = (value: number) => {
    setActiveIndex(value as MypageTabType);
    if (value === 0) setActivityKey((prev) => prev + 1);
  };

  const tabList = ["나의 활동", "계정 관리"];

  return (
    <section className="w-full max-w-[946px] mx-auto px-4 sm:px-6 lg:px-0 mt-[var(--space-40)]">
      <h2 className="txt-2xl-b mb-[var(--space-50)]">마이 페이지</h2>

      <div className="flex justify-between items-end mb-[var(--space-50)]">
        <UnderlineTab item={tabList} activeIndex={activeIndex} setActiveIndex={redirectHandler} />
        <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(Number(v))}>
          <SelectTrigger>
            <SelectValue placeholder="연도를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {activeIndex === 0 && <Activity key={activityKey} />}
      {activeIndex === 1 && <Profile />}
    </section>
  );
}
