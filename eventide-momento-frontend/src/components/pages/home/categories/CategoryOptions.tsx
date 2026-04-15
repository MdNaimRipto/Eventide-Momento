"use client";
import { FaExternalLinkAlt } from "react-icons/fa";
import Image, { StaticImageData } from "next/image";
import { LocalFonts } from "@/components/common/fonts";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";

interface Card {
  title: string;
  image: StaticImageData;
}

interface CategoryOptionsProps {
  cards: Card[];
}

const GAP = 40;
const AUTOPLAY_DELAY = 3000;
const SLIDE_DURATION = 1.6;

const getLayout = (width: number) => {
  if (width >= 1800) return { perView: 3, centered: true };
  if (width >= 1024) return { perView: 3, centered: false };
  if (width >= 768) return { perView: 2, centered: true };
  return { perView: 1, centered: true };
};

const CategoryOptions = ({ cards }: CategoryOptionsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [perView, setPerView] = useState(1);
  const [centered, setCentered] = useState(true);
  const [slideWidth, setSlideWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);

  const extended = [...cards, ...cards.slice(0, 3)];

  const measure = useCallback((node: HTMLDivElement | null) => {
    trackRef.current = node;
    if (!node) return;
    const { perView: pv, centered: c } = getLayout(window.innerWidth);
    const sw = (node.offsetWidth - GAP * (pv - 1)) / pv;
    setPerView(pv);
    setCentered(c);
    setSlideWidth(sw);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (!trackRef.current) return;
      const { perView: pv, centered: c } = getLayout(window.innerWidth);
      const sw = (trackRef.current.offsetWidth - GAP * (pv - 1)) / pv;
      setPerView(pv);
      setCentered(c);
      setSlideWidth(sw);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (slideWidth === 0) return;
    const target = -(index * (slideWidth + GAP));
    const controls = animate(x, target, {
      duration: SLIDE_DURATION,
      ease: [0.25, 0.1, 0.25, 1],
      onComplete: () => {
        if (index >= cards.length) {
          x.set(0);
          setIndex(0);
        }
      },
    });
    return () => controls.stop();
  }, [index, slideWidth, cards.length, x]);

  useEffect(() => {
    if (!isVisible || isHovered || slideWidth === 0) return;
    const timer = window.setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, AUTOPLAY_DELAY);
    return () => window.clearTimeout(timer);
  }, [index, isVisible, isHovered, slideWidth]);

  const realIndex = ((index % cards.length) + cards.length) % cards.length;
  const activeOffset = centered && perView >= 3 ? Math.floor(perView / 2) : 0;
  const activeIdx = (realIndex + activeOffset) % cards.length;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setBg = (globalThis as any).__setCategoryBg;
    if (setBg) setBg(activeIdx);
  }, [activeIdx]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute top-[540px] md:top-[550px] lg:top-1/2 -translate-y-1/2 px-2 xl:pl-[16rem] 2xl:pl-0  lg:px-8 2xl:px-[45rem] left-0 w-full h-[500px] md:h-[400px] lg:h-[520px] z-10 overflow-visible"
    >
      <div ref={measure} className="relative w-full h-full overflow-visible">
        <motion.div
          style={{ x, willChange: "transform" }}
          className="flex h-full gap-10"
        >
          {extended.map((card, i) => {
            const cardRealIdx = i % cards.length;
            const isActive = cardRealIdx === activeIdx;
            const isPrev =
              cardRealIdx === (activeIdx - 1 + cards.length) % cards.length;
            const isNext =
              cardRealIdx === (activeIdx + 1) % cards.length;
            return (
              <div
                key={i}
                style={{
                  width: slideWidth || `${100 / perView}%`,
                  flexShrink: 0,
                }}
                className="h-full"
              >
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
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryOptions;
