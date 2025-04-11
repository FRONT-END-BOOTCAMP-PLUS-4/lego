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
import { Card } from "@/components/ui/card";

export default function Home() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <>
      <Button variant="outline" size={"default"}>
        test
      </Button>
      <Button variant="outline" size={"lg"}>
        test
      </Button>
      <Badge variant="outline">test</Badge>
      <Input placeholder="hi" />
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">light</SelectItem>
          <SelectItem value="dark">dark</SelectItem>
          <SelectItem value="system">system</SelectItem>
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
      <Tabs defaultValue="menu1">
        <TabsList>
          <TabsTrigger value="menu1">메뉴 1</TabsTrigger>
          <TabsTrigger value="menu2">메뉴 2</TabsTrigger>
        </TabsList>
        <TabsContent value="menu1">menu1 contents.</TabsContent>
        <TabsContent value="menu2">menu2 contents.</TabsContent>
      </Tabs>
      <Card className="p-4">TEST</Card>
    </>
  );
}
