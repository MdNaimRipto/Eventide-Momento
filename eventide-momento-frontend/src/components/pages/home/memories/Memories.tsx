"use client";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { LocalFonts } from "@/components/common/fonts";
import ShutterText from "@/components/animations/ShutterText";
import Link from "next/link";
import OpacityTransition from "@/components/animations/OpacityTransition";
import CommonButton from "@/components/common/CommonButton";
import img1 from "@/assets/images/home/memories/1.webp";
import img2 from "@/assets/images/home/memories/2.webp";
import img3 from "@/assets/images/home/memories/3.webp";
import img4 from "@/assets/images/home/memories/4.webp";
import img5 from "@/assets/images/home/memories/5.webp";
import img6 from "@/assets/images/home/memories/6.webp";
import img7 from "@/assets/images/home/memories/7.webp";

interface MemorySet {
  images: StaticImageData[];
}

const memorySets: MemorySet[] = [
  {
    images: [img1, img2, img3, img4, img5, img6, img7],
  },
];

const Memories = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const images = memorySets[0].images;

  const nextImage = () => {
    if (activeIdx === null) return;
    setActiveIdx((activeIdx + 1) % images.length);
  };

  const prevImage = () => {
    if (activeIdx === null) return;
    setActiveIdx((activeIdx - 1 + images.length) % images.length);
  };

  const closeViewer = () => setActiveIdx(null);
  const lines = ["Precious", "Timeless", "Memories"];

  return (
    <div
      id="memories"
      className="container px-2 md:px-4 xl:px-16 py-16 relative"
    >
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 grid-rows-7 sm:grid-rows-3 auto-rows-[200px] sm:h-[1000px]">
        {/* Text Section */}
        <div className="col-span-1 sm:col-span-1 bg-primary flex flex-col justify-center xl:px-10 py-4 sm:py-0">
          <h1
            className={`text-secondary1 text-5xl sm:text-4xl md:text-5xl xl:text-5xl flex flex-col whitespace-nowrap tracking-[.95px] ${LocalFonts.anton.className}`}
          >
            {lines.map((line, i) => (
              <ShutterText key={i} text={line} delay={i * 0.3} />
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
            className={`overflow-hidden cursor-pointer ${
              idx === 0
                ? "col-span-1 md:col-span-2 lg:row-span-2"
                : idx === images.length - 1
                ? "col-span-1 lg:col-span-2 row-span-1"
                : "col-span-1 row-span-1"
            }`}
            onClick={() => setActiveIdx(idx)}
          >
            <Image
              src={img}
              alt=""
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
              placeholder="blur"
            />
          </div>
        ))}
      </div>

      {/* Image Viewer */}
      {activeIdx !== null && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 px-4 sm:px-0">
          {/* Close */}
          <button
            className="absolute top-5 right-5 text-white text-3xl sm:text-4xl p-2 hover:text-red-500"
            onClick={closeViewer}
          >
            <IoMdClose />
          </button>

          {/* Previous */}
          <button
            className="absolute left-2 sm:left-5 text-white text-3xl sm:text-4xl p-2 hover:text-gray-300"
            onClick={prevImage}
          >
            <IoIosArrowBack />
          </button>

          {/* Next */}
          <button
            className="absolute right-2 sm:right-5 text-white text-3xl sm:text-4xl p-2 hover:text-gray-300"
            onClick={nextImage}
          >
            <IoIosArrowForward />
          </button>

          {/* Image */}
          <div className="w-full sm:w-[90%] h-[60vh] sm:h-[90%] max-h-[90vh] mx-auto">
            <Image
              src={images[activeIdx]}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Memories;
