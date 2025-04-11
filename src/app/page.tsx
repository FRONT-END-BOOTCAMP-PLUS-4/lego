"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UnderlineTab } from "@/components/ui/underLinetab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";

export default function Home() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <>
      <Button variant="round">버튼</Button>
      <Button variant="default">버튼</Button>
      <Button variant="outline">버튼</Button>
      <Button variant="ghost">버튼</Button>

      <Input placeholder="내용을 입력하세요" />
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      <UnderlineTab
        item={["나의 활동", "계정 관리"]}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      >
        {activeIndex === 0 && "나의 활동 컴포넌트"}
        {activeIndex === 1 && "계정 관리 컴포넌트"}
      </UnderlineTab>
      <Badge>javascript</Badge>
      <Badge variant="outline">Badge</Badge>

      <Tabs defaultValue="menu1">
        <TabsList>
          <TabsTrigger value="menu1">메뉴 1</TabsTrigger>
          <TabsTrigger value="menu2">메뉴 2</TabsTrigger>
        </TabsList>
        <TabsContent value="menu1">menu1 contents.</TabsContent>
        <TabsContent value="menu2">menu2 contents.</TabsContent>
      </Tabs>
      <p className="leading-[var(--line-height)]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta ad minus amet repellendus
        dolore aperiam totam debitis, dolor velit asperiores voluptate assumenda animi cupiditate
        aliquid laudantium illo expedita maiores iste.
      </p>
    </>
  );
}
