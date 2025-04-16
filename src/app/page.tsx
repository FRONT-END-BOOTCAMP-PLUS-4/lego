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
    { id: 1, name: "HTML", src: "/assets/images/category/1.svg", href: "/category/1" },
    { id: 2, name: "CSS", src: "/assets/images/category/2.svg", href: "/category/2" },
    { id: 3, name: "JavaScript", src: "/assets/images/category/3.svg", href: "/category/3" },
    { id: 4, name: "TypeScript", src: "/assets/images/category/4.svg", href: "/category/4" },
    { id: 5, name: "React", src: "/assets/images/category/5.svg", href: "/category/5" },
    { id: 6, name: "Next", src: "/assets/images/category/6.svg", href: "/category/6" },
  ];

  return (
    <>
      <section className="flex justify-center gap-[var(--space-36)] mb-[150px]">
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
        <div className="flex flex-col justify-center items-center gap-6 text-center w-[40vw]">
          <div className="flex flex-col items-center txt-5xl-b">
            <p>기술 면접</p>
            <p>어떻게 공부해야할까?</p>
          </div>
          <p className="txt-3xl-b">잘 해야합니다</p>
          <Link href="/questions">
            <Button variant={"round"} className="w-fit">
              시작하기
            </Button>
          </Link>
        </div>
      </section>
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
