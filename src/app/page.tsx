"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import sampleImg from "@/assets/images/main/placeholder.png";

export default function Home() {
  return (
    <>
      <section className="flex gap-10 items-center justify-center pb-52">
        <Image
          src={sampleImg}
          width={200}
          height={300}
          alt="placeholder"
          sizes="(max-width: 768px) 100vw, 300px"
        />
        <div className="flex flex-col gap-6">
          <div className="text-3xl lg:text-5xl">
            <p>기술 면접</p>
            <p>어떻게 공부해야할까?</p>
          </div>
          <div className="text-xl lg:text-3xl">
            <p>설명입니당</p>
          </div>
          <Button variant={"round"} className="w-fit">
            Click me!
          </Button>
        </div>
      </section>
      <section>
        <p className="font-bold text-2xl lg:text-4xl pb-9">많이 스크랩된 콘텐츠</p>
        <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} variant="default">
              카드 {i + 1}
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
