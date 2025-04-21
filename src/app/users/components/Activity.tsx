"use client";

import { useEffect } from "react";
import GitHubCalendar from "react-github-calendar";
import { useAuthStore } from "@/store/useAuthStore";
import { useProfileStore } from "@/store/useProfileStore";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { formatNumber } from "@/utils/handleFormat";

export default function Activity() {
  const { user } = useAuthStore();
  const { selectedYear, setShowModal, mailAutoToggle, setMailAutoToggle } = useProfileStore();

  // 실제 구독여부를 토글에 반영
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      const res = await fetch(`/api/users?email=${user?.email}`);
      const data = await res.json();
      setMailAutoToggle(data.subscribed);
    };
    fetchSubscriptionStatus();
  }, [setMailAutoToggle, user?.email]);

  // 토글 상태 반영 - DB
  const handleToggle = async (checked: boolean) => {
    setMailAutoToggle(checked);

    if (checked) {
      setShowModal(true);
      try {
        // 토글 on - 구독 등록
        await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user?.email }),
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        // 토글 off - 구독 해지
        await fetch("/api/users", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user?.email }),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Card
        variant="default"
        className="flex justify-between mb-[38px] mt-[var(--space-50)] cursor-default"
      >
        <div className="flex">
          <div className="flex flex-col">
            <p className="txt-sm">내가 답변한 문제수</p>
            <p className="txt-4xl-b">{formatNumber(10)}</p>
          </div>

          <div className="w-px h-full bg-[var(--gray-01)] mx-[var(--space-36)]" />

          <div className="flex flex-col">
            <p className="txt-sm">나의 활동 일</p>
            <p className="txt-4xl-b">{formatNumber(10)}</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Switch checked={mailAutoToggle} onCheckedChange={handleToggle} />
          <p>메일 구독하기</p>
        </div>
      </Card>

      <div className="flex flex-col mb-[214px]">
        <h3 className="txt-lg-b mb-[18px]">일일 활동 기록</h3>
        <GitHubCalendar username="hoon95" year={selectedYear} />
      </div>
    </>
  );
}
