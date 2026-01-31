"use client";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import Image, { StaticImageData } from "next/image";
import { Autoplay } from "swiper/modules";
import { LocalFonts } from "@/components/common/fonts";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Card {
  title: string;
  image: StaticImageData;
}

interface CategoryOptionsProps {
  cards: Card[];
}

const CategoryOptions = ({ cards }: CategoryOptionsProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [autoplay, setAutoplay] = useState(false);

  // 👀 Track visibility of section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
        setAutoplay(entry.isIntersecting);
      },
      {
        threshold: 0.3, // Start when 30% of Swiper is visible
      },
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // 🎬 Control autoplay start/stop based on visibility
  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper || !autoplay) return;

    if (isVisible) {
      swiper.autoplay.start();
    } else {
      swiper.autoplay.stop();
    }
  }, [isVisible, autoplay]);

  return (
    <div
      ref={containerRef}
      className="absolute top-[540px] md:top-[550px] lg:top-1/2 -translate-y-1/2 px-2 xl:pl-[16rem] 2xl:pl-0  lg:px-8 2xl:px-[45rem] left-0 w-full h-[500px] md:h-[400px] lg:h-[520px] z-10 overflow-visible"
    >
      <Swiper
        ref={swiperRef}
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={40}
        centeredSlides
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
            centeredSlides: true,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
            centeredSlides: false,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 40,
            centeredSlides: false,
          },
          1800: {
            slidesPerView: 3,
            spaceBetween: 40,
            centeredSlides: true,
          },
        }}
        onSlideChange={(swiper) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const setBg = (globalThis as any).__setCategoryBg;
          if (setBg) setBg(swiper.realIndex);
        }}
        loop={true}
        autoplay={
          autoplay
            ? {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                stopOnLastSlide: false,
              }
            : false
        }
        speed={1600}
        className="px-8 h-full"
        style={{ overflow: "visible" }}
      >
        {cards.map((card, i) => (
          <SwiperSlide key={i}>
            {({ isActive, isPrev, isNext }) => (
              <Link
                href={`/events?category=${card.title}`}
                className={`block relative overflow-hidden w-full h-full rounded-xl transition-all duration-700
                  ${
                    isActive
                      ? "border-4 border-secondary2 md:scale-105 z-20"
                      : ""
                  }
                  ${
                    isPrev || isNext
                      ? "scale-90 lg:scale-100 z-10 border-none"
                      : ""
                  }
                `}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  className="object-cover w-full h-full brightness-75"
                  loading="lazy"
                  placeholder="blur"
                />
                <div className="absolute bottom-12 left-4 xl:left-8 flex items-center gap-2">
                  <h6
                    className={`${LocalFonts.anton.className} text-primary text-2xl xl:text-3xl`}
                  >
                    {card.title}
                  </h6>
                  <FaExternalLinkAlt
                    className={`${
                      isActive ? "group-hover:opacity-100" : "opacity-0"
                    } duration-700 text-3xl mb-[1px] text-white`}
                  />
                </div>
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryOptions;
