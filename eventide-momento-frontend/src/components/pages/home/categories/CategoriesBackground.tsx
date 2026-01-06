"use client";

import Image, { StaticImageData } from "next/image";
import { useState, useEffect } from "react";

interface Props {
  images: StaticImageData[];
}

export default function CategoriesBackground({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Expose setter globally for Swiper
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).__setCategoryBg = setActiveIndex;
  }, [setActiveIndex]);

  return (
    <div className="absolute inset-0">
      {images.map((img, i) => (
        <Image
          key={i}
          src={img}
          alt="category background"
          fill
          className={`object-cover transition-opacity duration-700 ease-in-out ${
            i === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          placeholder="blur"
        />
      ))}
    </div>
  );
}
