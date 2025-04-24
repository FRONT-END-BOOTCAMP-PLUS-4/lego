import Image from "next/image";

export default function Loader() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
      <Image
        src="/assets/images/loading.png"
        alt="loading"
        width={200}
        height={200}
        className="animate-spin"
      />

      <p className="txt-2xl-b mt-4">Loading...</p>
    </div>
  );
}
