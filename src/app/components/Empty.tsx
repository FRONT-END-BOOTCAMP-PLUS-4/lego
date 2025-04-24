"use client";

import { Card } from "@/components/ui/card";

interface PropsType {
  text: string;
}
export default function Empty({ text }: PropsType) {
  return (
    <Card className="text-[var(--black)] border-[var(--gray-01)] opacity-50 mx-auto w-full flex items-center justify-center h-[180px] bg-[var(--white)]">
      {text} 👻
    </Card>
  );
}
