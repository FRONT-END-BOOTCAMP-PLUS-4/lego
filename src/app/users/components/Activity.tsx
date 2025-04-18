"use client";

import { useState } from "react";
import GitHubCalendar from "react-github-calendar";
import { useProfileStore } from "@/store/useProfileStore";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function Activity() {
  const { selectedYear } = useProfileStore();

  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <Card
        variant="default"
        className="flex justify-between mb-[38px] mt-[var(--space-50)] cursor-default"
      >
        <div className="flex">
          <div className="flex flex-col">
            <p className="txt-sm">내가 답변한 문제수</p>
            <p className="txt-4xl-b">10</p>
          </div>

          <div className="w-px h-full bg-[var(--gray-01)] mx-[var(--space-36)]" />

          <div className="flex flex-col">
            <p className="txt-sm">나의 활동 일</p>
            <p className="txt-4xl-b">18</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Switch checked={enabled} onCheckedChange={setEnabled} />
          <p>카카오톡 알림 받기</p>
        </div>
      </Card>

      <div className="flex flex-col mb-[214px]">
        <h3 className="txt-lg-b mb-[18px]">일일 활동 기록</h3>
        <GitHubCalendar username="hoon95" year={selectedYear} />
      </div>
    </>
  );
}
