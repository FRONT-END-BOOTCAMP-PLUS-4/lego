import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image
        src="/assets/images/loading.png"
        alt="not found"
        width={400}
        height={400}
        className="animate-spin"
      />
      <p className="txt-2xl-b">Loading...</p>
    </div>
  );
}
