"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { LocalFonts } from "@/components/common/fonts";

const steps = [
  {
    number: "01",
    title: "Find Activities You Love",
    description:
      "Browse a curated feed of events by interest, city, and schedule. Sports, music, arts, workshops — your next moment is one tap away.",
  },
  {
    number: "02",
    title: "Join or Create Events",
    description:
      "Book a spot instantly, or host your own gathering and invite a community that shares your vibe.",
  },
  {
    number: "03",
    title: "Meet New People & Have Fun",
    description:
      "Show up, connect, and build friendships around things you actually love doing — then line up the next one.",
  },
];

const getSmallSize = (w: number) => {
  if (w >= 768) return 22;
  return 18;
};
const getBigSize = (w: number) => {
  if (w >= 1280) return 160;
  if (w >= 1024) return 128;
  if (w >= 768) return 96;
  return 44;
};

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bigSizeRef = useRef<number>(96);
  const smallSizeRef = useRef<number>(24);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const headingFontSize = useMotionValue(96);
  const headingTop = useTransform(scrollYProgress, [0, 0.15], ["50%", "6%"]);

  const progressOpacity = useTransform(scrollYProgress, [0.1, 0.17], [0, 1]);
  const progressWidth = useTransform(
    scrollYProgress,
    [0.17, 0.92],
    ["0%", "100%"],
  );

  const step1Opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const step1Y = useTransform(scrollYProgress, [0.2, 0.3], [40, 0]);
  const step2Opacity = useTransform(scrollYProgress, [0.42, 0.52], [0, 1]);
  const step2Y = useTransform(scrollYProgress, [0.42, 0.52], [40, 0]);
  const step3Opacity = useTransform(scrollYProgress, [0.64, 0.74], [0, 1]);
  const step3Y = useTransform(scrollYProgress, [0.64, 0.74], [40, 0]);

  const stepAnims = [
    { opacity: step1Opacity, y: step1Y },
    { opacity: step2Opacity, y: step2Y },
    { opacity: step3Opacity, y: step3Y },
  ];

  const stepPositions = [
    "top-[17vh] left-[4vw] md:left-[5vw] xl:left-[8vw]",
    "top-[41vh] left-[4vw] md:left-auto md:right-[5vw] xl:right-[8vw]",
    "top-[65vh] left-[4vw] md:left-[5vw] xl:left-[8vw]",
  ];

  useEffect(() => {
    const recompute = () => {
      bigSizeRef.current = getBigSize(window.innerWidth);
      smallSizeRef.current = getSmallSize(window.innerWidth);
      const v = scrollYProgress.get();
      const clamped = Math.max(0, Math.min(1, v / 0.15));
      headingFontSize.set(
        bigSizeRef.current +
          (smallSizeRef.current - bigSizeRef.current) * clamped,
      );
    };
    recompute();
    window.addEventListener("resize", recompute);
    return () => window.removeEventListener("resize", recompute);
  }, [headingFontSize, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const clamped = Math.max(0, Math.min(1, v / 0.15));
    headingFontSize.set(
      bigSizeRef.current +
        (smallSizeRef.current - bigSizeRef.current) * clamped,
    );
  });

  return (
    <section
      ref={sectionRef}
      className="relative z-[500] bg-secondary1"
      style={{ height: "280vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Morphing heading — big center → small top */}
        <motion.h2
          style={{
            fontSize: headingFontSize,
            top: headingTop,
            x: "-50%",
            y: "-50%",
          }}
          className={`${LocalFonts.anton.className} absolute left-1/2 text-primary uppercase whitespace-nowrap leading-none tracking-wide`}
        >
          How it Works?
        </motion.h2>

        {/* Compact progress bar */}
        <motion.div
          style={{ opacity: progressOpacity }}
          className="absolute left-1/2 top-[11vh] -translate-x-1/2 w-28 md:w-40 h-[1px] bg-primary/15"
        >
          <motion.div
            className="absolute inset-y-0 left-0 bg-primary"
            style={{ width: progressWidth }}
          />
        </motion.div>

        {/* Step cards in zig-zag positions */}
        {steps.map((step, i) => {
          const isRight = i === 1;
          return (
            <motion.div
              key={i}
              style={{ opacity: stepAnims[i].opacity, y: stepAnims[i].y }}
              className={`absolute ${stepPositions[i]} w-[92vw] md:w-[58vw] lg:w-[52vw] xl:w-[48vw] max-w-2xl`}
            >
              <div
                className={`relative pt-6 md:pt-10 xl:pt-12 ${
                  isRight
                    ? "pl-6 md:pl-0 md:pr-12 xl:pr-16"
                    : "pl-6 md:pl-12 xl:pl-16"
                }`}
              >
                <span
                  aria-hidden
                  className={`${LocalFonts.anton.className} absolute top-0 text-primary/10 text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[9rem] leading-[0.8] pointer-events-none select-none ${
                    isRight ? "left-0 md:left-auto md:right-0" : "left-0"
                  }`}
                >
                  {step.number}
                </span>
                <h3
                  className={`${LocalFonts.anton.className} relative z-10 text-primary uppercase text-xl md:text-3xl lg:text-4xl xl:text-5xl leading-none tracking-wide whitespace-nowrap ${
                    isRight ? "md:text-right" : ""
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`relative z-10 text-primary/60 text-xs md:text-sm xl:text-base mt-3 md:mt-4 leading-relaxed max-w-md ${
                    isRight ? "md:ml-auto md:text-right" : ""
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
