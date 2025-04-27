"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useProfileStore } from "@/store/useProfileStore";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { formatNumber } from "@/utils/handleFormat";
import dynamic from "next/dynamic";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const CalendarHeatmap = dynamic(() => import("react-calendar-heatmap"), { ssr: false });
import "react-calendar-heatmap/dist/styles.css";

export default function Activity() {
  const { user } = useAuthStore();
  const { selectedYear, setShowModal, mailAutoToggle, setMailAutoToggle } = useProfileStore();

  const [totalAnswers, setTotalAnswers] = useState<number | null>(null);
  const [activeDays, setActiveDays] = useState<number | null>(null);
  const [dailyActivity, setDailyActivity] = useState<{ date: string; count: number }[]>([]);

  const [displayedAnswers, setDisplayedAnswers] = useState(0);
  const [displayedActiveDays, setDisplayedActiveDays] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email) return;

      try {
        const [subRes, activityRes] = await Promise.all([
          fetch(`/api/users?email=${user.email}`),
          fetch(`/api/users/activity?email=${user.email}`),
        ]);

        const subData = await subRes.json();
        const activityData = await activityRes.json();

        setMailAutoToggle(subData.subscribed);
        setTotalAnswers(activityData.totalAnswers);
        setActiveDays(activityData.activeDays);
        setDailyActivity(activityData.dailyActivity);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    fetchData();
  }, [user?.email, setMailAutoToggle]);

  useEffect(() => {
    if (totalAnswers !== null) {
      let current = 0;
      const step = Math.max(1, Math.ceil(totalAnswers / 50)); // 가속도 비중 로직
      const interval = setInterval(() => {
        current += step;
        if (current >= totalAnswers) {
          setDisplayedAnswers(totalAnswers);
          clearInterval(interval);
        } else {
          setDisplayedAnswers(current);
        }
      }, 20);
    }
  }, [totalAnswers]);

  useEffect(() => {
    if (activeDays !== null) {
      let current = 0;
      const step = Math.max(1, Math.ceil(activeDays / 50));
      const interval = setInterval(() => {
        current += step;
        if (current >= activeDays) {
          setDisplayedActiveDays(activeDays);
          clearInterval(interval);
        } else {
          setDisplayedActiveDays(current);
        }
      }, 20);
    }
  }, [activeDays]);

  const handleToggle = async (checked: boolean) => {
    setMailAutoToggle(checked);

    if (!checked) {
      try {
        await fetch("/api/users", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user?.email }),
        });
      } catch (error) {
        console.error("구독 해지 실패:", error);
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <Card
        variant="default"
        className="flex justify-between mb-[38px] mt-[var(--space-50)] cursor-default hover:bg-[var(--blue-04)] px-4 sm:px-[36px]"
      >
        <div className="flex">
          <div className="flex flex-col">
            <p className="txt-sm">내가 답변한 문제수</p>
            <p className="txt-4xl-b">{formatNumber(displayedAnswers)}</p>
          </div>

          <div className="w-px h-full bg-[var(--gray-01)] mx-4 sm:mx-9" />

          <div className="flex flex-col">
            <p className="txt-sm">나의 활동 일</p>
            <p className="txt-4xl-b">{formatNumber(displayedActiveDays)}</p>
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
