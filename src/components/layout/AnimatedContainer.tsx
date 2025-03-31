"use client";

import { ReactNode } from "react";
import { motion, Variants, VariantLabels, TargetAndTransition } from "framer-motion";

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  variants: Variants;
  initial?: boolean | VariantLabels;
  animate?: string;
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: "some" | "all" | number;
  };
}

export default function AnimatedContainer({ 
  children, 
  className, 
  variants, 
  initial = "hidden", 
  animate = "visible", 
  viewport = { once: true } 
}: AnimatedContainerProps) {
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate as VariantLabels}
      viewport={viewport}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}