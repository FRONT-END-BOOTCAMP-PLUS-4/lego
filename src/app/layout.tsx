"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
// import CSRHead from "@/components/common/Head";
import { Toaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";
import { useHasHydrated } from "@/hooks/useHasHydrated";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const hasHydrated = useHasHydrated();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isAuthCallback = pathname.startsWith("/auth/callback");

  if (!hasHydrated) {
    return (
      <html lang="ko">
        {/* <CSRHead /> */}
        <body className="min-h-screen w-full flex justify-center items-center">
          <Spinner />
        </body>
      </html>
    );
  }

  return (
    <html lang="ko">
      {/* <CSRHead /> */}
      <body className="min-h-screen w-full flex flex-col">
        {isMounted && !isAuthCallback && <Header />}
        <div className="flex flex-col min-h-[calc(100vh-200px-80px)]">
          <main className="w-full max-w-[1080px] mx-auto flex-1 px-4 sm:px-4  bg-white">
            {children}
            <Toaster />
          </main>
        </div>
        {isMounted && !isAuthCallback && <Footer />}
      </body>
    </html>
  );
}
