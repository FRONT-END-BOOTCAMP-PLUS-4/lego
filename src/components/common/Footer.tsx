import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const handleBlockLink = (e) => {
    e.preventDefault();
  };
  return (
    <footer className="flex flex-col items-center sm:items-start justify-center h-[200px] px-20 py-4 bg-[var(--blue-04)]">
      <Link href="/">
        <Image src="/logo.png" width={50} height={50} alt="logo" />
      </Link>
      <div className="block sm:flex items-center gap-4 mt-3 ">
        <p className="text-sm text-gray-600">© 2025 lego. All rights reserved.</p>
        <div className="flex flex-col items-center gap-0 sm:flex-row sm:gap-4 ">
          <Link
            href="/privacy-policy"
            className="text-sm text-gray-600 hover:underline"
            onClick={handleBlockLink}
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="text-sm text-gray-600 hover:underline"
            onClick={handleBlockLink}
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
