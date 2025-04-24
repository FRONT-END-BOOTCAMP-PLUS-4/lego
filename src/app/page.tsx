"use client";

import CategoryList from "./components/CategoryList";
import Guide from "./components/Guide";
import BookmarkList from "./components/BookmarkList";
import EmailBanner from "./components/EmailBanner";
import AnswerList from "./components/AnswerList";

export default function Home() {
  return (
    <>
      <CategoryList />
      <Guide />
      <BookmarkList />
      <EmailBanner />
      <AnswerList />
    </>
  );
}
