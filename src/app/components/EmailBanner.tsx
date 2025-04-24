"use client";

import { useState } from "react";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useHandleMail } from "@/utils/handleMail";

export default function EmailBanner() {
  const handleMail = useHandleMail();
  const [offset, setOffset] = useState(20);

  return (
    <section className="mb-[100px]">
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] flex justify-center items-center px-4 py-[100px]">
        <div className="relative w-1/2 max-w-screen-sm rounded-[24px] bg-[var(--white)] shadow-md overflow-hidden">
          <div className="relative flex justify-center items-center w-full h-[200px] sm:h-[240px] overflow-hidden">
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
              className="object-contain absolute top-0 left-0 pointer-events-none"
              style={{
                clipPath: `inset(0 ${100 - offset}% 0 0)`,
              }}
            />

            <Slider
              defaultValue={[offset]}
              max={100}
              step={1}
              onValueChange={([val]) => setOffset(val)}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 z-20"
            />
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
