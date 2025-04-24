"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useHandleMail } from "@/utils/handleMail";

export default function EmailBanner() {
  const handleMail = useHandleMail();
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOffset(30);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setOffset(percent);
  };

  return (
    <section className="mb-[100px]">
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] flex justify-center items-center px-4 py-[100px]">
        <div className="relative w-1/2 max-w-screen-sm rounded-[var(--space-24)] bg-[var(--white)] overflow-hidden">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-[240px] overflow-hidden cursor-ew-resize"
          >
            <Image
              src="/assets/images/main/email_before.png"
              alt="우는 캐릭터"
              fill
              className="object-contain pointer-events-none"
            />
            <Image
              src="/assets/images/main/email_after.png"
              alt="웃는 캐릭터"
              fill
              className="absolute top-0 left-0 object-contain pointer-events-none transition-[clip-path] duration-300 ease-out"
              style={{
                clipPath: `inset(0 ${100 - offset}% 0 0)`,
              }}
            />

            <div
              className="absolute top-0 bottom-0 w-[2px] bg-[var(--blue-03)] z-20 transition-[left] duration-300 ease-out"
              style={{
                left: `${offset}%`,
                transform: "translateX(-50%)",
              }}
            />

            <div
              className="absolute z-30 w-8 h-8 bg-[var(--blue-02)] text-white text-sm flex items-center justify-center rounded-full shadow-md pointer-events-none transition-[left] duration-300 ease-out"
              style={{
                left: `${offset}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              ⇆
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 px-[var(--space-24)] py-6">
            <div className="txt-lg text-center">
              <p>
                바쁜 일상 속, <strong>하루 3분</strong>으로 면접 대비 끝!
              </p>
              <p>
                <strong>핵심만 쏙쏙</strong> 골라담은 질문만 전달해드려요 🔥
              </p>
            </div>
          </div>

          <div className="px-4 pb-4">
            <Button
              variant="default"
              onClick={handleMail}
              className="w-full bg-[var(--gray-01)] border-none text-[var(--black)]"
            >
              매일 기술면접 질문 받기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
