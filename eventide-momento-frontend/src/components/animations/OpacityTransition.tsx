"use client";
import { ReactElement } from "react";
import { motion } from "framer-motion";

const OpacityTransition = ({ children }: { children: ReactElement }) => {
  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

export default OpacityTransition;
