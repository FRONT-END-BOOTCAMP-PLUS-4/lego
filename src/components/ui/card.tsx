"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "tight" | "none";

const variantMap: Record<Variant, string> = {
  default: "p-9",
  tight: "px-9 py-[12px]",
  none: "p-0",
};

interface CardProps extends React.ComponentProps<"div"> {
  variant?: Variant;
}

function Card({ className, children, variant = "default", ...props }: CardProps) {
  return (
    <div
      className={cn(
        variantMap[variant],
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
