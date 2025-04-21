"use client";

import { useEffect, useState } from "react";
import { useProfileStore, MypageTabType, MypageYearType } from "@/store/useProfileStore";
import { UnderlineTab } from "@/components/ui/underLinetab";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHasHydrated } from "@/hooks/useHasHydrated";
import Profile from "./components/History";
import Activity from "./components/Activity";
import MailModal from "./components/MailModal";

export default function Mypage() {
  const hasHydrated = useHasHydrated();

  const {
    activeIndex,
    setActiveIndex,
    selectedYear,
    setSelectedYear,
    mailAutoToggle,
    setMailAutoToggle,
    showModal,
    setShowModal,
  } = useProfileStore();
  const [activityKey, setActivityKey] = useState(0);

  useEffect(() => {
    if (mailAutoToggle) {
      setShowModal(true);
      setMailAutoToggle(false);
    }
  }, [mailAutoToggle, setMailAutoToggle, setShowModal]);

  const redirectHandler = (value: number) => {
    setActiveIndex(value as MypageTabType);
    if (value === 0) setActivityKey((prev) => prev + 1);
  };

  const tabList = ["나의 활동", "히스토리"];

  if (!hasHydrated) {
    return (
      <section className="w-full h-screen flex justify-center items-center">
        <div className="text-xl text-gray-500">불러오는 중...</div>
      </section>
    );
  }
  return (
    <section className="w-full max-w-[946px] mx-auto px-4 sm:px-6 lg:px-0 mt-[var(--space-40)]">
      <MailModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
        }}
      />
      <h2 className="txt-2xl-b mb-[var(--space-50)]">마이 페이지</h2>

      <div className="flex justify-between items-end">
        <UnderlineTab item={tabList} activeIndex={activeIndex} setActiveIndex={redirectHandler} />

        {activeIndex === 0 && (
          <Select
            value={selectedYear.toString()}
            onValueChange={(v) => setSelectedYear(v as unknown as MypageYearType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="연도를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {activeIndex === 0 && <Activity key={activityKey} />}
      {activeIndex === 1 && <Profile />}
    </section>
  );
}
