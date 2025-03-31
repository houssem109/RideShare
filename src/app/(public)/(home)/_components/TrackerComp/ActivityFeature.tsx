import { motionVariants } from "@/components/animations/MotionVariants";
import { motion } from "framer-motion";

interface ActivityFeatureProps {
    number: string;
    title: string;
    description: string;
  }
  
  export default function ActivityFeature({ number, title, description }: ActivityFeatureProps) {
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
  
  