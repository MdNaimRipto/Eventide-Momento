"use client";

import { TextEffect } from "@/components/animations/text-effect";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface ShutterTextProps {
  text: string;
  delay?: number;
}

const ShutterText: React.FC<ShutterTextProps> = ({ text, delay = 0 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
  });

  return (
    <span ref={ref}>
      {isInView && (
        <TextEffect per="char" preset="slide" delay={delay} speedSegment={0.5}>
          {text}
        </TextEffect>
      )}
    </span>
  );
};

export default ShutterText;
