"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  // DB에 카테고리 추가 시 name, href 매핑 필요
  const category = [
    { id: 1, name: "HTML", src: "/assets/images/category/1.svg", href: "/category/1" },
    { id: 2, name: "CSS", src: "/assets/images/category/2.svg", href: "/category/2" },
    { id: 3, name: "JavaScript", src: "/assets/images/category/3.svg", href: "/category/3" },
    { id: 4, name: "TypeScript", src: "/assets/images/category/4.svg", href: "/category/4" },
    { id: 5, name: "React", src: "/assets/images/category/5.svg", href: "/category/5" },
    { id: 6, name: "Next", src: "/assets/images/category/6.svg", href: "/category/6" },
  ];

  return (
    <>
      <section className="flex justify-center gap-3 mb-[150px]">
        {category.map((item, index) => (
          <Link key={index} href={item.href} className="flex flex-col items-center gap-2">
            <Image src={item.src} alt={item.name} width={72} height={72} className="rounded-2xl" />
            <p>{item.name}</p>
          </Link>
        ))}
      </section>

      {/* background layer */}
      <section className="flex gap-10 items-center justify-center pb-52">
        {/* <Image src={sampleImg} alt="placeholder" sizes="(max-width: 768px) 100vw, 33vw" /> */}
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
