"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useHandleMail } from "@/utils/handleMail";
import { Mail } from "lucide-react";

export default function EmailBanner() {
  const handleMail = useHandleMail();

  return (
    <section className="mb-[100px]" data-aos="fade-up">
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[var(--blue-03)] flex justify-center items-center px-4 py-[100px]">
        <div className="relative w-1/2 max-w-screen-sm rounded-[24px] bg-[var(--white)] shadow-md">
          <div className="bg-[var(--white)] rounded-lg ">
            <p className="bg-[var(--yellow)] txt-lg !font-bold px-4 py-1.5">알림톡 도착</p>
            <div className="flex flex-col items-center gap-3 p-[var(--space-24)]">
              <Image
                src="/assets/images/main/kakao-banner.png"
                alt="메일 알림설정 배너"
                width={150}
                height={150}
              />
              <div className="txt-lg">
                <p>
                  바쁜 일상 속, <strong>하루 3분</strong>으로 면접 대비 끝!
                </p>
                <p>
                  <strong>핵심만 쏙쏙</strong> 골라담은 질문만 전달해드려요 🔥
                </p>
              </div>
            </div>
            <div className="px-4 py-2">
              <Button
                variant="default"
                onClick={handleMail}
                className="w-full bg-[var(--gray-01)] border-none text-[var(--black)]"
              >
                매일 기술면접 질문 받기
              </Button>
            </div>
          </div>

          <Badge variant="default" className="absolute top-[-10px] right-[-10px] !rounded-full">
            <Mail />
          </Badge>
        </div>
      </div>
    </section>
  );
}
