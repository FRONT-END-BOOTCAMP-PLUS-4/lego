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
      <body>
        {!isAuthCallback && <Header />}
        <main className="mx-auto px-32">{children}</main>
        {!isAuthCallback && <Footer />}
      </body>
    </html>
  );
}
