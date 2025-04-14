"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AnswerFormPage() {
  return (
    <div className="w-[1270px] container mx-auto pt-[40px]">
      <header className="flex justify-between items-center pb-[18px]">
        <div className="flex items-center">
          <Badge className="mr-[16px]">Javascript</Badge>
          <h3 className="txt-3xl-b">HTTP 메소드에 대한 설명</h3>
        </div>
        <Image
          src="/assets/icons/bookmark.svg"
          alt="bookmark icon"
          width={24}
          height={24}
          className="w-[24px] h-[24px] object-contain cursor-pointer"
        />
      </header>

      <div>
        <Tabs defaultValue="menu1 pb-[18px]">
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
          <TabsContent value="menu2">
            <textarea
              className="box-border p-[24px] h-[500px] border border-[var(--blue-03)] radius mt-6 w-full resize-none focus:ring-1 focus:ring-[var(--blue-03)] focus:outline-none"
              readOnly
            >
              답안내용
            </textarea>
          </TabsContent>
        </Tabs>
        <div className="flex justify-center mt-[24px]">
          <Button size="lg">저장</Button>
        </div>
      </div>
      <div>
        <h3 className="txt-2xl-b pb-6">다른 사람 답변 확인하기</h3>
        <div>
          <Card>
            <div className="flex gap-4 items-center">
              <p className="line-clamp-2">
                s not simply random text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
                Hampden-Sydney College in Virginiaer 2000 years old. Richard McClintock, a Latin
                professor at Hampden-Sydney College in Virginia
              </p>
              <span className="w-[32px] h-[32px] inline-block bg-[var(--gray-01)] rounded-full shrink-0"></span>
            </div>
            <div>
              <span>
                <span className="txt-sm">2020.20.20</span>
                <span>작성자 이름</span>
              </span>
              <span>좋아요 100</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
