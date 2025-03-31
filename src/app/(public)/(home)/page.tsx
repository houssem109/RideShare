"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import UsersGroup from "@/components/svg/UsersGroup";

export default function Page() {
  useTheme();

  const [mounted, setMounted] = useState(false);

  // This useEffect ensures hydration is complete before showing animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if dark mode is active

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              className="lg:w-1/2 lg:pr-12"
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              variants={fadeInRight}
            >
              <motion.div
                className="text-sm font-semibold text-indigo-600 tracking-wide uppercase"
                variants={fadeInUp}
              >
                Community-Driven Ridesharing Platform
              </motion.div>
              <motion.h1
                className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl"
                variants={fadeInUp}
              >
                Find Your <span className="text-indigo-400">Perfect Ride</span>
              </motion.h1>
              <motion.p
                className="mt-4 text-lg text-gray-500 dark:text-gray-300"
                variants={fadeInUp}
              >
                Connect with verified drivers and passengers going your way.
                Save money, reduce traffic, and help the environment with our
                community-driven carpooling platform.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-4"
                variants={fadeInUp}
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
              variants={fadeInLeft}
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
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
{/* 
     
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <motion.h2
              className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
              variants={fadeInUp}
            >
              Full-Featured Carpooling Platform
            </motion.h2>
            <motion.p
              className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300"
              variants={fadeInUp}
            >
              Our platform makes it easy to find or offer rides, save money, and
              help the environment.
            </motion.p>
          </motion.div>

          <motion.div
            className="mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg"
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg inline-block mb-4"
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
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
                </motion.div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Real-time Ride Matching
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-300">
                  Our intelligent algorithm connects you with drivers or
                  passengers going your way in real-time.
                </p>
              </motion.div>

           
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg"
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg inline-block mb-4"
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
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
                </motion.div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Verified Users
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-300">
                  All users are verified through ratings, and reviews for a safe
                  experience.
                </p>
              </motion.div>

             
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg"
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg inline-block mb-4"
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
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
                </motion.div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Cost Sharing
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-300">
                  Easily split fuel costs and tolls, with transparent pricing
                  and secure in-app payments.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section> 
      */}

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <motion.h2
              className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
              variants={fadeInUp}
            >
              Full-Featured Carpooling Platform
            </motion.h2>
            <motion.p
              className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300"
              variants={fadeInUp}
            >
              Our platform makes it easy to find or offer rides, save money, and
              help the environment.
            </motion.p>
          </motion.div>

          <motion.div
            className="mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg"
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg inline-block mb-4"
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
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
                </motion.div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Real-time Ride Matching
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-300">
                  Our intelligent algorithm connects you with drivers or
                  passengers going your way in real-time.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg"
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg inline-block mb-4"
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
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
                </motion.div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Verified Users
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-300">
                  All users are verified through ratings, and reviews for a safe
                  experience.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg"
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg inline-block mb-4"
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
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
                </motion.div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Cost Sharing
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-300">
                  Easily split fuel costs and tolls, with transparent pricing
                  and secure in-app payments.
                </p>
              </motion.div>
            </div>

            {/* Second row of features */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-8">
              {/* Feature 4 */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg"
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg inline-block mb-4"
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
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
                </motion.div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Flexible Scheduling
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-300">
                  Find rides for one-time trips or set up recurring carpools for
                  your daily commute.
                </p>
              </motion.div>

              {/* Feature 5 */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg"
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg inline-block mb-4"
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
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
                </motion.div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Environmental Impact
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-300">
                  Track your carbon footprint reduction and see how your
                  carpooling helps the environment.
                </p>
              </motion.div>

              {/* Feature 6 */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg"
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg inline-block mb-4"
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
                  <UsersGroup   className="h-8 w-8 text-indigo-600" />
                </motion.div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Community Building
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-300">
                  Connect with like-minded people in your area and build a
                  trusted network of carpoolers.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Track Audience Activities Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              className="lg:w-1/2 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
            >
              <motion.div
                className="w-64 h-64 rounded-full bg-indigo-100 dark:bg-indigo-900/20 absolute -top-12 -left-12 z-0"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              ></motion.div>
              <div className="w-full max-w-md mx-auto relative z-10">
                <motion.div
                  className="relative w-full h-[500px] md:h-[600px]"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
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
                          <div className="font-medium text-sm mb-2">
                            Your Upcoming Rides
                          </div>
                          <div className="space-y-3">
                            <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="text-xs font-medium">
                                    Downtown → Tech Park
                                  </div>
                                  <div className="text-xs">Today, 8:30 AM</div>
                                </div>
                                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded dark:bg-green-900 dark:text-green-200">
                                  Confirmed
                                </div>
                              </div>
                            </div>

                            <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="text-xs font-medium">
                                    Tech Park → Downtown
                                  </div>
                                  <div className="text-xs">Today, 5:30 PM</div>
                                </div>
                                <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded dark:bg-yellow-900 dark:text-yellow-200">
                                  Pending
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                          <div className="font-medium text-sm mb-2">
                            Trip Statistics
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                You Rating
                              </div>
                              <div className="text-lg font-bold text-yellow-400">
                                4.4<span className="ml-1">★</span>
                              </div>
                            </div>
                            <div className="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Money Saved
                              </div>
                              <div className="text-lg font-bold text-indigo-600">
                                $128
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              <motion.div
                className="w-40 h-40 rounded-full bg-pink-100 dark:bg-pink-900/20 absolute -bottom-8 -right-8 z-0"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, -10, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              ></motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 mt-16 lg:mt-0 lg:pl-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
            >
              <motion.div
                className="text-sm font-semibold text-indigo-600 tracking-wide uppercase"
                variants={fadeInUp}
              >
                Track Your Rides
              </motion.div>
              <motion.h2
                className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl"
                variants={fadeInUp}
              >
                Monitor Your Carpooling Activities
              </motion.h2>
              <motion.p
                className="mt-4 text-lg text-gray-500 dark:text-gray-300"
                variants={fadeInUp}
              >
                Schedule your rides for times when you need them. Keep track of
                your upcoming carpools, monitor your environmental impact, and
                see how much money you&lsquo;re saving.
              </motion.p>

              <motion.div
                className="mt-10 space-y-10"
                variants={staggerContainer}
              >
                <motion.div
                  className="flex"
                  variants={fadeInUp}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ rotate: 10, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <span className="text-xl font-bold">01</span>
                    </div>
                  </motion.div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Ride History and Analytics
                    </h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-300">
                      Access detailed records of all your rides, including
                      routes, co-riders, and savings over time.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex"
                  variants={fadeInUp}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ rotate: 10, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <span className="text-xl font-bold">02</span>
                    </div>
                  </motion.div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Feedback Summary
                    </h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-300">
                      View detailed ratings for safety, cleanliness, and
                      conversation.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <motion.h2
              className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
              variants={fadeInUp}
            >
              How it Works?
            </motion.h2>
            <motion.p
              className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300"
              variants={fadeInUp}
            >
              Getting started with carpooling is easy. Follow these simple steps
              to begin your journey.
            </motion.p>
          </motion.div>

          <motion.div
            className="mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Step 1 */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center"
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="mx-auto p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full inline-block mb-6"
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
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
                </motion.div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Create your account
                </h3>
                <p className="mt-4 text-gray-500 dark:text-gray-300">
                  Sign up, verify your identity, and set your travel preferences
                  in just a few minutes.
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center"
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="mx-auto p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full inline-block mb-6"
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
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
                </motion.div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Find your rides
                </h3>
                <p className="mt-4 text-gray-500 dark:text-gray-300">
                  Enter your destination and travel time, and we&apos;ll connect
                  you with perfect ride matches.
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center"
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="mx-auto p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full inline-block mb-6"
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
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
                </motion.div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Enjoy the features!
                </h3>
                <p className="mt-4 text-gray-500 dark:text-gray-300">
                  Save money, reduce emissions, and make new connections on your
                  daily commute with our carpooling platform.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl font-extrabold text-white sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="block">Ready to dive in?</span>
            <span className="block mt-2"></span>
          </motion.h2>
          <motion.p
            className="mt-4 text-lg leading-6 text-indigo-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Join thousands of users saving money and reducing traffic congestion
            with our carpooling platform.
          </motion.p>
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex rounded-md shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition duration-300"
              >
                Signup for free
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
