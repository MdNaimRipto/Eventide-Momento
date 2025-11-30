import bg from "@/assets/images/home/hero-banner.webp";
import CommonButton from "@/components/common/CommonButton";
import { LocalFonts } from "@/components/common/fonts";
import Image from "next/image";

const Banner = () => {
  const lines = ["We Turn", "Events into", "Unforgettable", "Moments"];

  const parentBase =
    "absolute left-0 top-0 h-full xl:w-[765px] 2xl:w-2/5 z-30 container flex flex-col justify-center gap-6";
  const textBase = `text-9xl flex flex-col gap-2 whitespace-nowrap tracking-[.95px] 2xl:ml-[3.7rem] ${LocalFonts.anton.className}`;

  return (
    <div className="relative w-full h-screen">
      <div className="absolute z-10 bg-gradient-to-r from-secondary1/40 to-secondary1/50 w-full h-full" />
      <div className="absolute w-full h-full overflow-hidden z-0 -scale-x-100">
        <Image
          src={bg}
          alt="Hero-image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className={`${parentBase}`}>
        <h1 className={`text-white ${textBase}`}>
          {lines.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </h1>
        <CommonButton title="Explore Events" />
      </div>
      <div className={`bg-primary overflow-hidden ${parentBase}`}>
        <h1 className={`text-secondary1 ${textBase}`}>
          {lines.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </h1>
        <div className="2xl:ml-[3.7rem]">
          <CommonButton title="Explore Events" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
