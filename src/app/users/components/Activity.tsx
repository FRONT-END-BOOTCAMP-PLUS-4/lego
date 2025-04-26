"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useProfileStore } from "@/store/useProfileStore";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { formatNumber } from "@/utils/handleFormat";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";
import "react-tooltip/dist/react-tooltip.css";

export default function Activity() {
  // 구독 관련 상태
  const { user } = useAuthStore();
  const { selectedYear, setShowModal, mailAutoToggle, setMailAutoToggle } = useProfileStore();

  // UI 관련 상태
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [activeDays, setActiveDays] = useState(0);
  const [dailyActivity, setDailyActivity] = useState<{ date: string; count: number }[]>([]);

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

    if (!checked) {
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
    } else {
      setShowModal(true);
    }
  };

  // UI 관련 로직
  useEffect(() => {
    const fetchUserActivity = async () => {
      if (!user?.email) return;
      const res = await fetch(`/api/users/activity?email=${user.email}`);
      const data = await res.json();

      setTotalAnswers(data.totalAnswers);
      setActiveDays(data.activeDays);
      setDailyActivity(data.dailyActivity);
    };

    fetchUserActivity();
  }, [user?.email]);

  return (
    <>
      <Card
        variant="default"
        className="flex justify-between mb-[38px] mt-[var(--space-50)] cursor-default hover:bg-[var(--blue-04)] px-4 sm:px-[36px]"
      >
        <div className="flex">
          <div className="flex flex-col">
            <p className="txt-sm">내가 답변한 문제수</p>
            <p className="txt-4xl-b">{formatNumber(totalAnswers)}</p>
          </div>

          <div className="w-px h-full bg-[var(--gray-01)] mx-4 sm:mx-9" />

          <div className="flex flex-col">
            <p className="txt-sm">나의 활동 일</p>
            <p className="txt-4xl-b">{formatNumber(activeDays)}</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Switch checked={mailAutoToggle} onCheckedChange={handleToggle} />
          <p>메일 구독하기</p>
        </div>
      </Card>

      <div className="flex flex-col overflow-x-auto">
        <h3 className="txt-lg-b mb-[18px]">일일 활동 기록</h3>
        <div className="min-w-[600px]">
          <CalendarHeatmap
            startDate={new Date(`${selectedYear}-01-01`)}
            endDate={new Date(`${selectedYear}-12-31`)}
            values={dailyActivity}
            classForValue={(value) => {
              if (!value) {
                return "color-empty";
              }
              return `color-scale-${value.count}`;
            }}
            transformDayElement={(element, value) => {
              const tooltip =
                value?.date && value.count !== undefined
                  ? `${value.date} - ${value.count}개`
                  : "활동 없음";

              return React.cloneElement(element as React.ReactElement, {
                ...({
                  "data-tooltip-id": "heatmap-tooltip",
                  "data-tooltip-content": tooltip,
                } as Record<string, unknown>),
              });
            }}
          />
        </div>
        <Tooltip id="heatmap-tooltip" />
      </div>
    </>
  );
}
