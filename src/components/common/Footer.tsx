import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center px-10 py-4 bg-[var(--blue-04)]">
      <Link className="text-xl text-black" href="/">
        <Image src="logo.svg" width={100} height={100} alt="logo" className="md:w-[200px]" />
      </Link>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <p className="text-sm text-gray-600">© 2025 lego. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="text-sm text-gray-600 hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-sm text-gray-600 hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
