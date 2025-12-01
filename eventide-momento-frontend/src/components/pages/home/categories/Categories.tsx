"use client";

import bg01 from "@/assets/images/home/hero-banner.webp";
import bg02 from "@/assets/images/auth/banner.webp";
import { LocalFonts } from "@/components/common/fonts";
import Image, { StaticImageData } from "next/image";
import CategoryOptions from "./CategoryOptions";
import { useState } from "react";
import ShutterText from "@/components/animations/ShutterText";
import OpacityTransition from "@/components/animations/OpacityTransition";
import CommonButton from "@/components/common/CommonButton";
import Link from "next/link";

const Categories = () => {
  const lines = ["Explore", "Hobbies", "Together"];

  const sampleCards = [
    { title: "Hiking Adventure", image: bg01 },
    { title: "Board Game Night", image: bg02 },
    { title: "Music Concert", image: bg01 },
    { title: "Tech Meetup", image: bg02 },
    { title: "Art Workshop", image: bg01 },
    { title: "Board Game Night", image: bg02 },
  ];

  const [currentImg, setCurrentImg] = useState(sampleCards[0].image);
  const [fade, setFade] = useState(false);
  const [transitionImg, setTransitionImg] = useState(sampleCards[0].image);

  const handleBgChange = (img: StaticImageData) => {
    // Put the incoming image on the transition layer
    setTransitionImg(img);

    // Restart fade
    setFade(false);

    // Use RAF twice so browser *paints* before the fade starts
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFade(true);
      });
    });

    // After fade completes, lock it in as the main background
    setTimeout(() => {
      setCurrentImg(img);
      setFade(false);
    }, 1600); // match your transition duration
  };

  return (
    <div className="relative w-full h-[860px] md:h-[850px] lg:h-screen overflow-hidden z-[500]">
      <div className="absolute z-10 bg-gradient-to-r from-secondary1/40 to-secondary1/50 w-full h-full" />
      <div className="relative w-full h-full overflow-hidden">
        {/* Always-visible base background */}
        <Image
          src={currentImg}
          alt="bg"
          fill
          className="object-cover"
          priority
        />

        {/* Fading new image */}
        <Image
          src={transitionImg}
          alt="transition"
          fill
          className={`object-cover transition-opacity duration-700 ease-in-out 
      ${fade ? "opacity-100" : "opacity-0"}`}
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute z-10 bg-gradient-to-r from-secondary1/40 to-secondary1/50 w-full h-full" />

      {/* Carousel */}
      <CategoryOptions cards={sampleCards} setActiveBg={handleBgChange} />

      {/* Text Layer */}
      <div
        className={`lg:bg-primary overflow-hidden absolute right-0 top-0 h-full lg:w-[440px] xl:w-[550px] 2xl:w-[764px] z-30 container flex flex-col lg:justify-center gap-6 mt-10 lg:mt-0`}
      >
        <h1
          className={`text-primary lg:text-secondary1 text-5xl lg:text-8xl xl:text-[7rem] 2xl:text-9xl flex flex-col gap-2 whitespace-nowrap tracking-[.95px] ${LocalFonts.anton.className}`}
        >
          {lines.map((line, i) => (
            <ShutterText key={i} text={line} delay={i * 0.3} />
          ))}
        </h1>
        <Link
          href="/events"
          className="scale-75 -ml-10 -mt-3 md:scale-100 md:-ml-0 md:-mt-0 xl:mt-4"
        >
          <OpacityTransition delay={1}>
            <CommonButton title="Explore Events" />
          </OpacityTransition>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
