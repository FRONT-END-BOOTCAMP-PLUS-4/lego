import Image from "next/image";
import notFound from "@/assets/images/not-found.png";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src={notFound} width={500} height={500} alt="" />
      <h1>페이지를 찾을 수 없어요 :(</h1>
    </div>
  );
}
