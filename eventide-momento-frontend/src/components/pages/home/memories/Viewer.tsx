"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";

export default function ViewerClient({
  images,
}: {
  images: StaticImageData[];
}) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  if (activeIdx === null) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/80 flex items-center justify-center">
      <button
        className="absolute top-5 right-5 text-white text-3xl"
        onClick={() => setActiveIdx(null)}
      >
        <IoMdClose />
      </button>

      <button
        className="absolute left-5 text-white text-4xl"
        onClick={() =>
          setActiveIdx((activeIdx - 1 + images.length) % images.length)
        }
      >
        <IoIosArrowBack />
      </button>

      <button
        className="absolute right-5 text-white text-4xl"
        onClick={() => setActiveIdx((activeIdx + 1) % images.length)}
      >
        <IoIosArrowForward />
      </button>

      <div className="w-[90%] h-[90%]">
        <Image
          src={images[activeIdx]}
          alt=""
          className="w-full h-full object-contain"
          priority
        />
      </div>
    </div>
  );
}
