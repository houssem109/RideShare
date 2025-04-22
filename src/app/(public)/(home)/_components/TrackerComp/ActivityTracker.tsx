"use client";

import { motion } from "framer-motion";
import { motionVariants } from "@/components/animations/MotionVariants";
import ActivityFeature from "./ActivityFeature";
import TrackerAppPreview from "./TrackerAppPreview";

export default function ActivityTracker() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div
            className="lg:w-1/2 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={motionVariants.fadeInRight}
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
                <TrackerAppPreview />
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
            variants={motionVariants.fadeInLeft}
          >
            <motion.div
              className="text-sm font-semibold text-indigo-600 tracking-wide uppercase"
              variants={motionVariants.fadeInUp}
            >
              Track Your Rides
            </motion.div>
            <motion.h2
              className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl"
              variants={motionVariants.fadeInUp}
            >
              Monitor Your Carpooling Activities
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-gray-500 dark:text-gray-300"
              variants={motionVariants.fadeInUp}
            >
              Schedule your rides for times when you need them. Keep track of
              your upcoming carpools, monitor your environmental impact, and see
              how much money you&lsquo;re saving.
            </motion.p>

            <motion.div
              className="mt-10 space-y-10"
              variants={motionVariants.staggerContainer}
            >
              <ActivityFeature
                number="01"
                title="Ride History and Analytics"
                description="Access detailed records of all your rides, including routes, co-riders, and savings over time."
              />

              <ActivityFeature
                number="02"
                title="Feedback Summary"
                description="View detailed ratings for safety, cleanliness, and conversation."
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
