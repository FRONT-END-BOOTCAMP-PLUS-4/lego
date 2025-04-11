"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

function Card({
  className,
  children,
  padding = "p-9", // 기본값
  ...props
}: React.ComponentProps<"div"> & { padding?: string }) {
  return (
    <div
      className={cn(
        padding,
        "bg-[var(--blue-04)] border border-[var(--gray-01)] rounded-[var(--radius-md)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Card };
