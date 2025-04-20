import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image src="/assets/images/not-found.png" alt="not found" width={600} height={600} />
    </div>
  );
}
