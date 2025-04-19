"use client";
import { Card } from "@/components/ui/card";
export default function AnswerPreviewCard() {
  return (
    <Card>
      <div className="flex gap-4 items-center mb-6">
        <p className="line-clamp-2">
          s not simply random text. It has roots in a piece of classical Latin literature from 45
          BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
          College in Virginiaer 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia
        </p>
        <span className="w-[32px] h-[32px] inline-block bg-[var(--gray-01)] rounded-full shrink-0"></span>
      </div>
      <div className="flex justify-between">
        <span>
          <span className="txt-sm !text-[var(--gray-02)] mr-2">2020.20.20</span>
          <span className="txt-sm !text-[var(--gray-02)]">작성자 이름</span>
        </span>
        <span className="txt-sm !text-[var(--gray-02)]">좋아요 100</span>
      </div>
    </Card>
  );
}
