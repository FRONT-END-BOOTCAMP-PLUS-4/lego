"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Bookmark } from "lucide-react";

// api로 불러온 실제 데이터와 매핑 필요
const bookmarks = [
  {
    id: 1,
    category: "JavaScript",
    title:
      "HTTP 메소드에 대한 설명HTTP 메소드에 대한 설명HTTP 메소드에 대한 설명HTTP 메소드에 대한 설명",
    icon: "/assets/image/jsicon.svg", // category 테이블 - image_url
    link: "/questions/1",
  },
  {
    id: 2,
    category: "JavaScript",
    title: "Event Loop란 무엇인가요? 그러게 뭘까??ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    icon: "/assets/image/jsicon.svg",
    link: "/questions/2",
  },
];

export default function BookmarkPage() {
  return (
    <div className="flex flex-col gap-4 mb-[150px]">
      {bookmarks.map((item) => (
        <Link href={item.link} key={item.id}>
          <Card variant="tight" className="flex items-center justify-between">
            <div className="txt-2xl-b flex items-center gap-6 cursor-pointer w-[90%]">
              <Image src={item.icon} width={32} height={32} alt={`${item.category} 아이콘`} />
              <p className="line-clamp-1 w-4/5">{item.title}</p>
            </div>
            <Bookmark className="fill-amber-300 stroke-none" />
          </Card>
        </Link>
      ))}
    </div>
  );
}
