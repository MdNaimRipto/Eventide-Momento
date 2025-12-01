import bg from "@/assets/images/home/hero-banner.webp";
import OpacityTransition from "@/components/animations/OpacityTransition";
import ShutterText from "@/components/animations/ShutterText";
import CommonButton from "@/components/common/CommonButton";
import { LocalFonts } from "@/components/common/fonts";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  const lines = ["We Turn", "Events into", "Unforgettable", "Moments"];

  const parentBase =
    "absolute left-0 top-0 h-full md:w-[535px] lg:w-[518px] xl:w-[550px] 2xl:w-[764px] z-30 container flex-col justify-center gap-6";
  const textBase = `text-5xl md:text-8xl 2xl:text-9xl flex flex-col gap-2 whitespace-nowrap tracking-[.95px] 2xl:ml-[3.7rem] ${LocalFonts.anton.className}`;

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
      <div className={`${parentBase} flex`}>
        <h1 className={`text-white ${textBase}`}>
          {lines.map((line, i) => (
            <ShutterText key={i} text={line} delay={i * 0.3} />
          ))}
        </h1>
        <OpacityTransition delay={1}>
          <Link href="/events">
            <CommonButton title="Explore Events" />
          </Link>
        </OpacityTransition>
      </div>
      <div
        className={`bg-primary overflow-hidden hidden md:flex ${parentBase}`}
      >
        <h1 className={`text-secondary1 ${textBase}`}>
          {lines.map((line, i) => (
            <ShutterText key={i} text={line} delay={i * 0.3} />
          ))}
        </h1>
        <div className="2xl:ml-[3.7rem]">
          <OpacityTransition delay={1}>
            <Link href="/events">
              <CommonButton title="Explore Events" />
            </Link>
          </OpacityTransition>
        </div>
      </div>
    </div>
  );
};

export default Banner;
