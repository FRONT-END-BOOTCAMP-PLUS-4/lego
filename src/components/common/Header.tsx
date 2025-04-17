import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--blue-04)] flex justify-between items-center px-10 py-4 shadow-md">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} className="md:w-[200px]" />
      </Link>
      <Link href="/login">
        <Button variant={"ghost"}>로그인/회원가입</Button>
      </Link>
    </header>
  );
}
