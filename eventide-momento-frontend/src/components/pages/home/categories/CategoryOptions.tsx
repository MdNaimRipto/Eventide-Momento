"use client";
import { FaExternalLinkAlt } from "react-icons/fa";
import Image, { StaticImageData } from "next/image";
import { LocalFonts } from "@/components/common/fonts";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  PanInfo,
  useMotionValue,
} from "framer-motion";

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
const DRAG_VELOCITY_THRESHOLD = 500;

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
  const [isDragging, setIsDragging] = useState(false);
  const [perView, setPerView] = useState(1);
  const [centered, setCentered] = useState(true);
  const [slideWidth, setSlideWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const [animTick, setAnimTick] = useState(0);
  const x = useMotionValue(0);

  const extended = [...cards, ...cards.slice(0, 3)];
  const step = slideWidth + GAP;
  const dragMin = -(cards.length * step);

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
    const target = -(index * step);
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
  }, [index, slideWidth, step, cards.length, x, animTick]);

  useEffect(() => {
    if (!isVisible || isHovered || isDragging || slideWidth === 0) return;
    const timer = window.setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, AUTOPLAY_DELAY);
    return () => window.clearTimeout(timer);
  }, [index, isVisible, isHovered, isDragging, slideWidth]);

  const realIndex = ((index % cards.length) + cards.length) % cards.length;
  const activeOffset = centered && perView >= 3 ? Math.floor(perView / 2) : 0;
  const activeIdx = (realIndex + activeOffset) % cards.length;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setBg = (globalThis as any).__setCategoryBg;
    if (setBg) setBg(activeIdx);
  }, [activeIdx]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    setIsDragging(false);
    if (slideWidth === 0) return;

    const currentX = x.get();
    const rawIndex = -currentX / step;
    const velocity = info.velocity.x;

    let newIndex: number;
    if (velocity < -DRAG_VELOCITY_THRESHOLD) {
      newIndex = Math.ceil(rawIndex);
    } else if (velocity > DRAG_VELOCITY_THRESHOLD) {
      newIndex = Math.floor(rawIndex);
    } else {
      newIndex = Math.round(rawIndex);
    }

    newIndex = Math.max(0, Math.min(newIndex, cards.length));

    if (newIndex === index) {
      setAnimTick((t) => t + 1);
    } else {
      setIndex(newIndex);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute top-[540px] md:top-[550px] lg:top-1/2 -translate-y-1/2 px-2 xl:pl-[16rem] 2xl:pl-0  lg:px-8 2xl:px-[45rem] left-0 w-full h-[500px] md:h-[400px] lg:h-[520px] z-10"
    >
      <div
        ref={measure}
        className="relative w-full h-full overflow-hidden lg:overflow-visible"
      >
        <motion.div
          style={{
            x,
            gap: `${GAP}px`,
            willChange: "transform",
            cursor: slideWidth > 0 ? (isDragging ? "grabbing" : "grab") : "default",
            touchAction: "pan-y",
          }}
          className="flex h-full select-none"
          drag={slideWidth > 0 ? "x" : false}
          dragConstraints={{ left: dragMin, right: 0 }}
          dragElastic={0.15}
          dragMomentum={false}
          dragDirectionLock
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
        >
          {extended.map((card, i) => {
            const cardRealIdx = i % cards.length;
            const isActive = cardRealIdx === activeIdx;
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
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  className={`block relative overflow-hidden w-full h-full rounded-xl transition-all duration-700 ${
                    isActive
                      ? "border-4 border-secondary2 lg:scale-105 z-20"
                      : "z-10 border-none"
                  }`}
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    className="object-cover w-full h-full brightness-75 pointer-events-none"
                    loading="lazy"
                    placeholder="blur"
                    draggable={false}
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
