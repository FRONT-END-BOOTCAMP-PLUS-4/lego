"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import AOS from "aos";
import "aos/dist/aos.css";
import CategoryList from "./components/CategoryList";
import Guide from "./components/Guide";

const BookmarkList = dynamic(() => import("./components/BookmarkList"));
const EmailBanner = dynamic(() => import("./components/EmailBanner"));
const AnswerList = dynamic(() => import("./components/AnswerList"));

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 30,
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
