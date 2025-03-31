"use client";

import { motion } from "framer-motion";
import AnimatedContainer from "@/components/layout/AnimatedContainer";
import { motionVariants } from "@/components/animations/MotionVariants";
import StepCard from "./StepCard";


// Steps data
const stepsData = [
  {
    id: 1,
    title: "Create your account",
    description: "Sign up, verify your identity, and set your travel preferences in just a few minutes.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-indigo-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Find your rides",
    description: "Enter your destination and travel time, and we'll connect you with perfect ride matches.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-indigo-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Enjoy the features!",
    description: "Save money, reduce emissions, and make new connections on your daily commute with our carpooling platform.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-indigo-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export default function HowItWorks() {
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
            How it Works?
          </motion.h2>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300"
            variants={motionVariants.fadeInUp}
          >
            Getting started with carpooling is easy. Follow these simple steps
            to begin your journey.
          </motion.p>
        </AnimatedContainer>

        <AnimatedContainer
          className="mt-16"
          variants={motionVariants.staggerContainer}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {stepsData.map((step) => (
              <StepCard
                key={step.id}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}