import Image from "next/image";

export default function NotFound() {
  return (
    <div
      className="flex items-center justify-center flex-col text-center"
      style={{ height: "calc(100vh - 200px - 80px)" }}
    >
      <Image src="/assets/images/not-found.png" alt="not found" width={200} height={200} />
      <h2 className="text-2xl font-bold mb-2">페이지를 찾을 수 없습니다</h2>
      <p className="text-gray-500">유효하지 않은 접근입니다</p>
    </div>
  );
}
