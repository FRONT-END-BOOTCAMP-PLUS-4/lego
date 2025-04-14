"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AnswerFormPage() {
  return (
    <div className="w-[1270px] container mx-auto pt-[40px]">
      <header className="flex justify-between">
        <div className="flex items-center">
          <Badge className="mr-[16px]">Javascript</Badge>
          <h3 className="txt-3xl-b">HTTP 메소드에 대한 설명</h3>
        </div>
        <Image
          src="/assets/icons/bookmark.svg"
          alt="bookmark icon"
          width={24}
          height={24}
          className="object-contain cursor-pointer"
        />
      </header>

      <div className="pt-[18px]">
        <Tabs defaultValue="menu1">
          <TabsList className="mr-0 ml-auto">
            <TabsTrigger value="menu1">나의 답변 작성하기</TabsTrigger>
            <TabsTrigger value="menu2">모범 답안 확인하기</TabsTrigger>
          </TabsList>
          <TabsContent value="menu1">
            <textarea
              className="box-border p-[24px] h-[500px] border border-[var(--blue-03)] radius mt-6 w-full resize-none focus:ring-1 focus:ring-[var(--blue-03)] focus:outline-none"
              placeholder="내용을 입력하세요..."
            ></textarea>
          </TabsContent>
          <TabsContent value="menu2">menu2 contents.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
