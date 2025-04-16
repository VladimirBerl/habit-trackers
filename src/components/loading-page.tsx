import Image from "next/image";

export const LoadingPage = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
      <Image
        src="/images/duck-stay.png"
        width={150}
        height={150}
        alt="loading"
      />
      <p className="font-semibold text-lg text-center">Loading...</p>
    </div>
  );
};
