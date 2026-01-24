import Image from "next/image";
import Link from "next/link";
import { LocalFonts } from "@/components/common/fonts";
import ViewerClient from "./Viewer";

import img1 from "@/assets/images/home/memories/1.webp";
import img2 from "@/assets/images/home/memories/2.webp";
import img3 from "@/assets/images/home/memories/3.webp";
import img4 from "@/assets/images/home/memories/4.webp";
import img5 from "@/assets/images/home/memories/5.webp";
import img6 from "@/assets/images/home/memories/6.webp";
import img7 from "@/assets/images/home/memories/7.webp";
import ShutterText from "@/components/animations/ShutterText";
import OpacityTransition from "@/components/animations/OpacityTransition";
import CommonButton from "@/components/common/CommonButton";

const images = [img1, img2, img3, img4, img5, img6, img7];
const lines = ["Precious", "Timeless", "Memories"];

export default function Memories() {
  return (
    <section
      id="memories"
      className="container px-2 md:px-4 xl:px-16 py-16 overflow-anchor-none"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 grid-rows-7 sm:grid-rows-3 auto-rows-[200px] sm:h-[1000px]">
        {/* Text block */}
        <div className="bg-primary flex flex-col justify-center xl:px-10 py-4">
          <h1
            className={`text-secondary1 text-5xl flex flex-col whitespace-nowrap ${LocalFonts.anton.className}`}
          >
            {lines.map((line, i) => (
              <div key={line} className="min-h-[3.5rem] overflow-hidden">
                <ShutterText text={line} delay={i * 0.3} />
              </div>
            ))}
          </h1>
          <Link
            href="/events"
            className="scale-75 -ml-10 lg:-ml-8 mt-3 sm:mt-4"
          >
            <OpacityTransition delay={1}>
              <CommonButton title="Explore Events" />
            </OpacityTransition>
          </Link>
        </div>

        {/* Images */}
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`overflow-hidden ${
              idx === 0
                ? "md:col-span-2 lg:row-span-2"
                : idx === images.length - 1
                  ? "lg:col-span-2"
                  : ""
            }`}
          >
            <Image
              src={img}
              alt=""
              placeholder="blur"
              loading={idx < 2 ? "eager" : "lazy"}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Client-only interactive island */}
      <ViewerClient images={images} />
    </section>
  );
}
