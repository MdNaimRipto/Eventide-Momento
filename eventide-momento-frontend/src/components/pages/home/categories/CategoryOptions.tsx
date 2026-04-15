"use client";
import { FaExternalLinkAlt } from "react-icons/fa";
import Image, { StaticImageData } from "next/image";
import { LocalFonts } from "@/components/common/fonts";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

interface Card {
  title: string;
  image: StaticImageData;
}

interface CategoryOptionsProps {
  cards: Card[];
}

const GAP = 40;
const SPEED_PX_PER_SEC = 55;

const getPerView = (width: number) => {
  if (width >= 1024) return 3;
  if (width >= 768) return 2;
  return 1;
};

const CategoryOptions = ({ cards }: CategoryOptionsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [hoveredKey, setHoveredKey] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [perView, setPerView] = useState(1);
  const [slideWidth, setSlideWidth] = useState(0);
  const x = useMotionValue(0);

  const tripled = [...cards, ...cards, ...cards];
  const step = slideWidth + GAP;
  const trackWidth = cards.length * step;

  const measure = useCallback(
    (node: HTMLDivElement | null) => {
      trackRef.current = node;
      if (!node) return;
      const pv = getPerView(window.innerWidth);
      const sw = (node.offsetWidth - GAP * (pv - 1)) / pv;
      setPerView(pv);
      setSlideWidth(sw);
      x.set(-(cards.length * (sw + GAP)));
    },
    [cards.length, x],
  );

  useEffect(() => {
    const onResize = () => {
      if (!trackRef.current) return;
      const pv = getPerView(window.innerWidth);
      const sw = (trackRef.current.offsetWidth - GAP * (pv - 1)) / pv;
      setPerView(pv);
      setSlideWidth(sw);
      x.set(-(cards.length * (sw + GAP)));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [cards.length, x]);

  // Pause when ANY card is hovered, or while dragging
  const isPaused = hoveredKey !== null;

  useAnimationFrame((_, delta) => {
    if (isPaused || isDragging || slideWidth === 0 || trackWidth === 0) return;
    const dx = (SPEED_PX_PER_SEC * delta) / 1000;
    let newX = x.get() - dx;
    if (newX < -2 * trackWidth) newX += trackWidth;
    x.set(newX);
  });

  const handleDragEnd = () => {
    setIsDragging(false);
    if (trackWidth === 0) return;
    let v = x.get();
    while (v < -2 * trackWidth) v += trackWidth;
    while (v > 0) v -= trackWidth;
    x.set(v);
  };

  // React synthetic stopPropagation fires too late to beat framer-motion's
  // native pointerdown listener, so we attach a native listener directly.
  const stopDragPropagation = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const stop = (e: Event) => e.stopPropagation();
    node.addEventListener("pointerdown", stop);
    node.addEventListener("mousedown", stop);
    node.addEventListener("touchstart", stop);
  }, []);

  return (
    <div
      ref={containerRef}
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
          dragConstraints={{ left: -2 * trackWidth, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          dragDirectionLock
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
        >
          {tripled.map((card, i) => {
            const isHovered = hoveredKey === i;
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
                  onMouseEnter={() => setHoveredKey(i)}
                  onMouseLeave={() =>
                    setHoveredKey((h) => (h === i ? null : h))
                  }
                  className={`block relative overflow-hidden w-full h-full rounded-xl transition-all duration-700 ${
                    isHovered
                      ? "border-4 border-secondary2 lg:scale-105 z-20"
                      : "z-10"
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
                  <div
                    ref={stopDragPropagation}
                    className="absolute bottom-12 left-4 xl:left-8 flex items-center gap-2"
                  >
                    <h6
                      className={`${LocalFonts.anton.className} text-primary text-2xl xl:text-3xl`}
                    >
                      {card.title}
                    </h6>
                    <FaExternalLinkAlt
                      className={`${
                        isHovered ? "opacity-100" : "opacity-0"
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
