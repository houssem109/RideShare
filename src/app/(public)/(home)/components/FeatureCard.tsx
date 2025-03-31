"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { motionVariants } from "@/components/animations/MotionVariants";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg"
      variants={motionVariants.fadeInUp}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <motion.div
        className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg inline-block mb-4"
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-gray-500 dark:text-gray-300">
        {description}
      </p>
    </motion.div>
  );
}