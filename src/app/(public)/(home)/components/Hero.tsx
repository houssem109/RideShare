"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { motionVariants } from "@/components/animations/MotionVariants";


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
              Connect with verified drivers and passengers going your way.
              Save money, reduce traffic, and help the environment with our
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="#watch-demo"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition duration-300 transform hover:scale-105"
              >
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 text-indigo-600 size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  Offer a Ride
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
              className="w-full h-full rounded-full bg-indigo-100 dark:bg-indigo-900/20 absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4 z-0"
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

// App preview component
function AppPreview() {
  return (
    <>
      <div className="absolute w-full h-full rounded-3xl overflow-hidden shadow-xl transform -rotate-3 scale-95 -translate-x-6 translate-y-2 bg-gray-100 dark:bg-gray-800"></div>
      <div className="absolute w-full h-full rounded-3xl overflow-hidden shadow-2xl">
        <div className="w-full h-full bg-white dark:bg-gray-900 flex flex-col">
          <div className="h-6 bg-gray-100 dark:bg-gray-800 flex items-center px-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium">From</div>
                <div className="text-sm font-medium">To</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="bg-white dark:bg-gray-700 p-2 rounded w-5/12 text-xs">
                  Downtown
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                <div className="bg-white dark:bg-gray-700 p-2 rounded w-5/12 text-xs">
                  Tech Park
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="font-medium mb-2">
                Available Rides
              </div>
              <div className="space-y-3">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-indigo-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-medium">
                          Alex K.
                        </div>
                        <div className="text-xs">
                          8:30 AM • $5.50
                        </div>
                      </div>
                    </div>
                    <button className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                      Book
                    </button>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-indigo-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-medium">
                          Sarah M.
                        </div>
                        <div className="text-xs">
                          9:00 AM • $4.75
                        </div>
                      </div>
                    </div>
                    <button className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}