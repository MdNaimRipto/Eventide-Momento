"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

interface DynamicSwiperProps {
  children: ReactNode[];
  slidesPerView?: number;
  spaceBetween?: number;
  loop?: boolean;
  speed?: number;
  breakpoints?: {
    [width: number]: import("swiper/types").SwiperOptions;
  };
  autoplay?: boolean;
}

const DynamicSwiper = ({
  children,
  slidesPerView = 1,
  spaceBetween = 20,
  loop = false,
  speed = 1500,
  breakpoints,
  autoplay = false,
}: DynamicSwiperProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // IntersectionObserver to track visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => setIsVisible(entries[0].isIntersecting),
      { threshold: 0.3 },
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // Control autoplay based on visibility
  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper || !autoplay) return;

    if (isVisible) swiper.autoplay.start();
    else swiper.autoplay.stop();
  }, [isVisible, autoplay]);

  return (
    <div ref={containerRef} className="relative w-full">
      <Swiper
        ref={swiperRef}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        loop={loop}
        speed={speed}
        breakpoints={breakpoints}
        modules={[Autoplay]}
        autoplay={
          autoplay
            ? {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
      >
        {children.map((child, i) => (
          <SwiperSlide key={i}>{child}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DynamicSwiper;
