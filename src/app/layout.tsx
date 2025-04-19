"use client";

import { usePathname } from "next/navigation";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import CSRHead from "@/components/common/Head";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthCallback = pathname.startsWith("/auth/callback");

  return (
    <html lang="ko">
      <CSRHead />
      <body className="min-h-screen w-full flex flex-col">
        {!isAuthCallback && <Header />}
        <main className="w-full max-w-[1272px] mx-auto px-32 flex-1">{children}</main>
        {!isAuthCallback && <Footer />}
      </body>
    </html>
  );
}
