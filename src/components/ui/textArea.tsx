"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function TextArea(
  props: {
    label?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>
) {
  const { className, label = "아이디", ...rest } = props;

  return (
    <div
      data-slot="textarea"
      className={cn(
        "w-full h-[120px] rounded-md border border-[var(--gray-01)] bg-white px-4 py-3",
        className
      )}
    >
      {/* 👇 여기에 mt-1 추가 */}
      <div className="text-sm font-bold mt-1 mb-[4px]">{label}</div>

      <input
        className="w-full border-none text-sm placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
        {...rest}
      />
    </div>
  );
}

export { TextArea };
