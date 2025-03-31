"use client";

import { motion } from "framer-motion";
import { motionVariants } from "../../../../components/animations/MotionVariants";


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
              your upcoming carpools, monitor your environmental impact, and
              see how much money you&lsquo;re saving.
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

interface ActivityFeatureProps {
  number: string;
  title: string;
  description: string;
}

function ActivityFeature({ number, title, description }: ActivityFeatureProps) {
  return (
    <motion.div
      className="flex"
      variants={motionVariants.fadeInUp}
      whileHover={{ x: 5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="flex-shrink-0"
        whileHover={{ rotate: 10, transition: { duration: 0.2 } }}
      >
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
          <span className="text-xl font-bold">{number}</span>
        </div>
      </motion.div>
      <div className="ml-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-gray-500 dark:text-gray-300">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function TrackerAppPreview() {
  return (
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
                  Your Rating
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
  );
}