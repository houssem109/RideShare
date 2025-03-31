"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

import UsersGroup from "@/components/svg/UsersGroup";
import AnimatedContainer from "../../../../components/layout/AnimatedContainer";
import { motionVariants } from "../../../../components/animations/MotionVariants";
import FeatureCard from "./FeatureCard";

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
}

// Feature data
const featuresData: FeatureItem[] = [
  {
    id: 1,
    title: "Real-time Ride Matching",
    description: "Our intelligent algorithm connects you with drivers or passengers going your way in real-time.",
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
    id: 2,
    title: "Verified Users",
    description: "All users are verified through ratings, and reviews for a safe experience.",
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
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Cost Sharing",
    description: "Easily split fuel costs and tolls, with transparent pricing and secure in-app payments.",
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
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Flexible Scheduling",
    description: "Find rides for one-time trips or set up recurring carpools for your daily commute.",
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
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Environmental Impact",
    description: "Track your carbon footprint reduction and see how your carpooling helps the environment.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-8 w-8 text-indigo-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
        />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Community Building",
    description: "Connect with like-minded people in your area and build a trusted network of carpoolers.",
    icon: <UsersGroup className="h-8 w-8 text-indigo-600" />,
  },
];

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
            {featuresData.slice(0, 3).map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-8">
            {featuresData.slice(3).map((feature) => (
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