"use client";

import GitHubCalendar from "react-github-calendar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Activity() {
  return (
    <>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder={2025} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="current">{2025}</SelectItem>
          <SelectItem value="lastYear">{2024}</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex flex-col">
        <h3 className="txt-lg-b">일일 활동 기록</h3>
        <div className="">
          <GitHubCalendar username="who" year={2025} />
        </div>
      </div>
    </>
  );
}
