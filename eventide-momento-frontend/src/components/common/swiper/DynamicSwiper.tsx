"use client";

import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  animate,
  motion,
  PanInfo,
  useMotionValue,
} from "framer-motion";

interface BreakpointConfig {
  slidesPerView?: number;
  spaceBetween?: number;
}

interface DynamicSwiperProps {
  children: ReactNode[];
  slidesPerView?: number;
  spaceBetween?: number;
  loop?: boolean;
  speed?: number;
  breakpoints?: { [width: number]: BreakpointConfig };
  autoplay?: boolean;
}

const AUTOPLAY_DELAY = 3000;
const DRAG_VELOCITY_THRESHOLD = 500;

const resolveConfig = (
  width: number,
  defaults: BreakpointConfig,
  breakpoints?: { [width: number]: BreakpointConfig },
) => {
  let active: BreakpointConfig = { ...defaults };
  if (breakpoints) {
    const sorted = Object.keys(breakpoints)
      .map(Number)
      .sort((a, b) => a - b);
    for (const bp of sorted) {
      if (width >= bp) active = { ...active, ...breakpoints[bp] };
    }
  }
  return {
    perView: active.slidesPerView ?? 1,
    gap: active.spaceBetween ?? 0,
  };
};

const DynamicSwiper = ({
  children,
  slidesPerView = 1,
  spaceBetween = 20,
  loop = false,
  speed = 1500,
  breakpoints,
  autoplay = false,
}: DynamicSwiperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [perView, setPerView] = useState(slidesPerView);
  const [gap, setGap] = useState(spaceBetween);
  const [slideWidth, setSlideWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const [animTick, setAnimTick] = useState(0);
  const x = useMotionValue(0);

  const childrenArray = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children],
  );

  const needsLoop = loop && childrenArray.length > perView;

  const extended = useMemo(
    () =>
      needsLoop
        ? [...childrenArray, ...childrenArray.slice(0, perView)]
        : childrenArray,
    [childrenArray, needsLoop, perView],
  );

  const maxIndex = needsLoop
    ? childrenArray.length
    : Math.max(0, childrenArray.length - perView);

  const step = slideWidth + gap;
  const dragMin = -(maxIndex * step);

  const updateLayout = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;
    const { perView: pv, gap: gp } = resolveConfig(
      window.innerWidth,
      { slidesPerView, spaceBetween },
      breakpoints,
    );
    const sw = (node.offsetWidth - gp * (pv - 1)) / pv;
    setPerView(pv);
    setGap(gp);
    setSlideWidth(sw);
  }, [slidesPerView, spaceBetween, breakpoints]);

  const measure = useCallback(
    (node: HTMLDivElement | null) => {
      trackRef.current = node;
      if (node) updateLayout();
    },
    [updateLayout],
  );

  useEffect(() => {
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [updateLayout]);

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
    setIndex(0);
    x.set(0);
  }, [perView, needsLoop, x]);

  useEffect(() => {
    if (slideWidth === 0) return;
    const target = -(index * step);
    const controls = animate(x, target, {
      duration: Math.max(0.2, speed / 1000),
      ease: [0.25, 0.1, 0.25, 1],
      onComplete: () => {
        if (needsLoop && index >= childrenArray.length) {
          x.set(0);
          setIndex(0);
        }
      },
    });
    return () => controls.stop();
  }, [index, slideWidth, step, speed, needsLoop, childrenArray.length, x, animTick]);

  useEffect(() => {
    if (
      !autoplay ||
      !isVisible ||
      isHovered ||
      isDragging ||
      slideWidth === 0
    )
      return;
    if (maxIndex <= 0) return;
    const timer = window.setTimeout(() => {
      setIndex((prev) => {
        if (needsLoop) return prev + 1;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, AUTOPLAY_DELAY);
    return () => window.clearTimeout(timer);
  }, [
    index,
    isVisible,
    isHovered,
    isDragging,
    slideWidth,
    autoplay,
    needsLoop,
    maxIndex,
  ]);

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

    newIndex = Math.max(0, Math.min(newIndex, maxIndex));

    if (newIndex === index) {
      setAnimTick((t) => t + 1);
    } else {
      setIndex(newIndex);
    }
  };

  const isDraggable = slideWidth > 0 && maxIndex > 0;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full"
    >
      <div ref={measure} className="w-full overflow-hidden">
        <motion.div
          style={{
            x,
            gap: `${gap}px`,
            willChange: "transform",
            cursor: isDraggable ? (isDragging ? "grabbing" : "grab") : "default",
            touchAction: "pan-y",
          }}
          className="flex select-none"
          drag={isDraggable ? "x" : false}
          dragConstraints={{ left: dragMin, right: 0 }}
          dragElastic={0.15}
          dragMomentum={false}
          dragDirectionLock
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
        >
          {extended.map((child, i) => (
            <div
              key={i}
              style={{
                width: slideWidth || `${100 / perView}%`,
                flexShrink: 0,
              }}
              className="pointer-events-auto"
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DynamicSwiper;
