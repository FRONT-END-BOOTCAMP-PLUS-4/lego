import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <header className="bg-[var(--blue-04)] flex justify-between items-center px-6 py-4">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={200} height={100} />
      </Link>
      <Link href="/login">
        <Button variant={"ghost"}>로그인/회원가입</Button>
      </Link>
    </header>
  );
}

export default Header;
