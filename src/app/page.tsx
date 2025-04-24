"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CategoryList from "./components/CategoryList";
import Guide from "./components/Guide";
import BookmarkList from "./components/BookmarkList";
import EmailBanner from "./components/EmailBanner";
import AnswerList from "./components/AnswerList";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1300,
      once: true,
      offset: 50,
    });
  }, []);

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
