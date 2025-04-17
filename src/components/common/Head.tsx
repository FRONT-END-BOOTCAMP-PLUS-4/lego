"use client";

import { useEffect } from "react";
import Head from "next/head";

export default function CSRHead() {
  useEffect(() => {
    document.title = "레고 - 지식의 블럭을 쌓아나가자!";
  }, []);

  return (
    <Head>
      <meta name="description" content="기술면접 준비 플랫폼" />

      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
    </Head>
  );
}
