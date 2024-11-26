import { HeroSVG } from "./HeroSVG";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <main className="flex flex-col lg:flex-row-reverse justify-center align-center text-white text-center">
      {/* SVG Animation */}
      <motion.div
        className="w-[70%] pl-40 lg:w-[30%] lg:p-0 animate-pulse"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      >
        <HeroSVG />
      </motion.div>

      {/* Text Content */}
      <motion.div
        className="md:pt-[8%]"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
      >
        {/* Hero Heading */}
        <motion.h1
          className="font-bold text-6xl"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Mess <span className="text-blue-500">Management</span> System
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="py-10 text-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
        >
          Simplifying Meal Management for Hostels and Institutions
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          className="py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 1, ease: "easeInOut" }}
        >
          {/* Get Started Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Link
              to="/auth/login"
              className="bg-blue-500 py-3 px-40 hover:bg-blue-700 transition rounded text-2xl"
            >
              Get Started
            </Link>
          </motion.div>
          <p className="mt-6 mb-3">OR</p>

          {/* Request Access Link */}
          <motion.div
            whileHover={{ scale: 1.1, color: "#2563eb" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Link
              to="/auth/request"
              className="text-xl hover:underline hover:text-blue-500"
            >
              Request Access
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}

export { HeroSection };
