"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark } from "lucide-react";

export default function Home() {
  // DB에 카테고리 추가 시 name, href 매핑 필요
  const category = [
    { id: 1, name: "HTML", src: "/assets/images/category/1.svg", href: "/questions?category=1" },
    { id: 2, name: "CSS", src: "/assets/images/category/2.svg", href: "/questions?category=2" },
    {
      id: 3,
      name: "JavaScript",
      src: "/assets/images/category/3.svg",
      href: "/questions?category=3",
    },
    {
      id: 4,
      name: "TypeScript",
      src: "/assets/images/category/4.svg",
      href: "/questions?category=4",
    },
    { id: 5, name: "React", src: "/assets/images/category/5.svg", href: "/questions?category=5" },
    { id: 6, name: "Next", src: "/assets/images/category/6.svg", href: "/questions?category=6" },
  ];

  return (
    <>
      <section className="flex justify-center gap-[var(--space-24)] md:gap-[var(--space-36)] mb-[150px]">
        {category.map((item, index) => (
          <Link key={index} href={item.href} className="flex flex-col items-center gap-2">
            <Image
              src={item.src}
              alt={item.name}
              width={36}
              height={36}
              className="max-w-[72px] md:w-[72px] md:h-[72px]"
            />
            <p>{item.name}</p>
          </Link>
        ))}
      </section>

      <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-gradient-to-t from-[var(--blue-03)] via-white to-white pb-[100px] mb-[100px] text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="txt-5xl-b mb-[var(--space-24)]">
            기술 면접
            <br />
            어떻게 준비해야할까?
          </h2>
          <p className="!text-gray-500 txt-lg mb-[var(--space-36)]">
            기술 면접은 정말 어렵습니다.
            <br />
            하지만, 저희와 함께라면 걱정하지 마세요!
          </p>
          <Link href="/questions">
            <Button variant={"round"} className="w-fit">
              시작하기
            </Button>
          </Link>
        </div>
      </section>

      {/* <section className="flex justify-center gap-[var(--space-24)] md:gap-[var(--space-36)] mb-[150px]">
        {category.map((item, index) => (
          <Link key={index} href={item.href} className="flex flex-col items-center gap-2">
            <Image
              src={item.src}
              alt={item.name}
              width={36}
              height={36}
              className="max-w-[72px] md:w-[72px] md:h-[72px]"
            />
            <p>{item.name}</p>
          </Link>
        ))}
      </section> */}

      <section>
        <h3 className="txt-3xl-b pb-[var(--space-36)]">많이 스크랩된 콘텐츠</h3>
        <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Link href={`/questions/${i + 1}`} key={i}>
              <Card key={i} variant="default" className="flex flex-col gap-[var(--space-40)]">
                <p className="txt-2xl-b">HTTP 메소드에 대한 설명</p>
                <div className="flex justify-between">
                  <Badge variant="outline">JavaScript</Badge>
                  <div className="flex gap-[8px]">
                    <Bookmark />
                    <p>1000</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
