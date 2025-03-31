"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { motionVariants } from "@/components/animations/MotionVariants";
import AppPreview from "./AppPreview";
import { CirclePlus } from "lucide-react";
import RightFlesh from "@/components/svg/RightFlesh";

interface HeroProps {
  mounted: boolean;
}

export default function Hero({ mounted }: HeroProps) {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div
            className="lg:w-1/2 lg:pr-12"
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={motionVariants.fadeInRight}
          >
            <motion.div
              className="text-sm font-semibold text-indigo-600 tracking-wide uppercase"
              variants={motionVariants.fadeInUp}
            >
              Community-Driven Ridesharing Platform
            </motion.div>
            <motion.h1
              className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl"
              variants={motionVariants.fadeInUp}
            >
              Find Your <span className="text-indigo-400">Perfect Ride</span>
            </motion.h1>
            <motion.p
              className="mt-4 text-lg text-gray-500 dark:text-gray-300"
              variants={motionVariants.fadeInUp}
            >
              Connect with verified drivers and passengers going your way. Save
              money, reduce traffic, and help the environment with our
              community-driven carpooling platform.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4"
              variants={motionVariants.fadeInUp}
            >
              <Link
                href="#download"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
              >
                <span className="mr-2">Find a Ride</span>
                <RightFlesh />
              </Link>
              <Link
                href="#watch-demo"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition duration-300 transform hover:scale-105"
              >
                <span className="flex items-center">
                  Offer a Ride
                  <CirclePlus className="h-5 w-5 text-indigo-600  ml-1" />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 mt-10 lg:mt-0 relative"
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={motionVariants.fadeInLeft}
          >
            <motion.div
              className="w-full h-full rounded-full bg-indigo-100 dark:bg-indigo-900/20 absolute top-0 left-0 transform -translate-x-10 -translate-y-16 z-0"
              style={{ width: "120%", height: "120%", opacity: 0.6 }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            ></motion.div>

            <div className="relative z-10">
              <div className="w-full max-w-md mx-auto">
                <motion.div
                  className="relative w-full h-[500px] md:h-[600px]"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <AppPreview />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
