import bg from "@/assets/images/home/hero-banner.webp";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative w-full h-screen grid grid-cols-2">
      <div className="absolute z-10 bg-gradient-to-r from-secondary1/40 to-secondary1/50 w-full h-full" />
      <div className="absolute w-full h-full overflow-hidden z-0 -scale-x-100">
        <Image
          src={bg}
          alt="Hero-image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-primary col-span-1 h-full w-full z-30"></div>
    </div>
  );
};

export default Banner;
