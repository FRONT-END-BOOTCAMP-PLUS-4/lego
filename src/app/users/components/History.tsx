"use client";

import { useProfileStore, ProfileTabType } from "@/store/useProfileStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import { JSX } from "react";

const MyAnswerPage = dynamic(() => import("./MyAnswer"), { ssr: false });
const BookmarkPage = dynamic(() => import("./Bookmark"), { ssr: false });
const CommentPage = dynamic(() => import("./Comment"), { ssr: false });
const LikeAnswerPage = dynamic(() => import("./LikeAnswer"), { ssr: false });

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

  const selectedTabData = tabs.find((tab) => tab.value === selectedTab);

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

        {selectedTabData && (
          <TabsContent key={selectedTabData.value} value={selectedTabData.value}>
            {selectedTabData.component}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
