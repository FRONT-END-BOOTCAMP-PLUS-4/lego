"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyAnswerPage from "./MyAnswer";
import BookmarkPage from "./Bookmark";
import CommentPage from "./Comment";
import LikeAnswerPage from "./LikeAnswer";
import { useProfileStore, ProfileTabType } from "@/store/useProfileStore";
import { JSX } from "react";

const tabs: { label: string; value: ProfileTabType; component: JSX.Element }[] = [
  { label: "내답변", value: "myAnswer", component: <MyAnswerPage /> },
  { label: "북마크", value: "bookmark", component: <BookmarkPage /> },
  { label: "좋아요 한 답변", value: "likeAnswer", component: <LikeAnswerPage /> },
  { label: "댓글", value: "comment", component: <CommentPage /> },
];

export default function History() {
  const { selectedTab, setSelectedTab } = useProfileStore();

  const handleTabs = (value: string) => {
    setSelectedTab(value as ProfileTabType);
  };

  return (
    <div className="mt-[var(--space-24)]">
      <Tabs defaultValue={selectedTab} onValueChange={handleTabs}>
        <TabsList className="mb-[var(--space-50)]">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
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
