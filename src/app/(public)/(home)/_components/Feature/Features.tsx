"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";


import AnimatedContainer from "@/components/layout/AnimatedContainer";
import { motionVariants } from "@/components/animations/MotionVariants";
import FeatureCard from "./FeatureCard";
import { FeaturesData } from "./featuresData";





export default function Features() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContainer
          className="text-center"
          variants={motionVariants.fadeIn}
        >
          <motion.h2
            className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
            variants={motionVariants.fadeInUp}
          >
            Full-Featured Carpooling Platform
          </motion.h2>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300"
            variants={motionVariants.fadeInUp}
          >
            Our platform makes it easy to find or offer rides, save money, and
            help the environment.
          </motion.p>
        </AnimatedContainer>

        <AnimatedContainer
          className="mt-20"
          variants={motionVariants.staggerContainer}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {FeaturesData.map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
          
         
        </AnimatedContainer>
      </div>
    </section>
  );
}