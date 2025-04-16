import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-between items-center px-10 py-4 bg-[var(--blue-04)] text-white mt-10">
      <Link className="text-xl text-black" href="/">
        <Image src="logo.svg" width={200} height={100} alt="logo" />
      </Link>
    </footer>
  );
}
