import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="flex justify-between items-center px-10 py-4 bg-[var(--blue-04)] text-white mt-10">
      <Link className="text-xl text-black" href="/">
        <Image src={logo} width={50} height={50} alt="logo" />
      </Link>
    </footer>
  );
}
