"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

const OpacityTransition = ({
  children,
  delay,
}: {
  children: ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1, delay }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

export default OpacityTransition;
