"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function AnswerTab({ value, onValueChange }) {
  return (
    <Tabs defaultValue="tab1" value={value} onValueChange={onValueChange}>
      <TabsList className="mr-0 ml-auto">
        <TabsTrigger value="tab1">나의 답변 작성하기</TabsTrigger>
        <TabsTrigger value="tab2">모범 답안 확인하기</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <textarea
          className="box-border p-[24px] h-[500px] border border-[var(--blue-03)] radius mt-6 w-full resize-none focus:ring-1 focus:ring-[var(--blue-03)] focus:outline-none"
          placeholder="내용을 입력하세요..."
          ref={answerRef}
          disabled={!isEditing}
        ></textarea>
      </TabsContent>
      <TabsContent value="tab2">
        <textarea
          className="box-border p-[24px] h-[500px] border border-[var(--blue-03)] radius mt-6 w-full resize-none focus:ring-1 focus:ring-[var(--blue-03)] focus:outline-none"
          readOnly
          value={"답안내용"}
        ></textarea>
      </TabsContent>
    </Tabs>
  );
}
