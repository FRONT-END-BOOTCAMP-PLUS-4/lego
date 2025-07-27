import Image from "next/image";

export default function Loader() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
      <Image
        src="/logoImg.svg"
        alt="loading"
        width={150}
        height={50}
        className="animate-bounce translate-y-8"
      />
      <p className="txt-xl-b">Loading...</p>
    </div>
  );
}
