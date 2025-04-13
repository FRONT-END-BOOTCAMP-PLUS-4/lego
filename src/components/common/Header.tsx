import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import logo from "@/assets/images/logo.png";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-10 py-4 bg-[var(--blue-04)] text-white mb-10">
      <Link className="text-xl text-black" href="/">
        <Image src={logo} width={50} height={50} alt="logo" />
      </Link>
      <nav className="flex gap-4">
        <Link href="/login" className="text-white no-underline text-base">
          <Button variant="ghost">로그인/회원가입</Button>
        </Link>
      </nav>
    </header>
  );
}
