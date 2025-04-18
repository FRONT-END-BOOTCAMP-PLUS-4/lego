"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyAnswer from "./MyAnswer";
import Bookmark from "./Bookmark";
import Comment from "./Comment";
import LikeAnswer from "./LikeAnswer";
import { useProfileStore, ProfileTabType } from "@/store/useProfileStore";
import { JSX } from "react";

const tabs: { label: string; value: ProfileTabType; component: JSX.Element }[] = [
  { label: "내답변", value: "myAnswer", component: <MyAnswer /> },
  { label: "북마크", value: "bookmark", component: <Bookmark /> },
  { label: "좋아요 한 답변", value: "likeAnswer", component: <LikeAnswer /> },
  { label: "댓글", value: "comment", component: <Comment /> },
];

export default function History() {
  const { selectedTab, setSelectedTab } = useProfileStore();

  const handleTabs = (value: string) => {
    setSelectedTab(value as ProfileTabType);
  };

  return (
    <div className="mt-[var(--space-24)]">
      <Tabs value={selectedTab} onValueChange={handleTabs}>
        <TabsList className="mb-[var(--space-50)]">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="txt-lg">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
