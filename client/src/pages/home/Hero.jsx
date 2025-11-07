import React from "react"; 
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStickyNote } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white overflow-hidden">

      {/* ==== Floating Green Glow Circles ==== */}
      <div className="absolute top-16 left-10 w-64 h-64 bg-[#10B981]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-16 right-10 w-64 h-64 bg-[#10B981]/10 rounded-full blur-3xl animate-pulse"></div>

      {/* ==== Hero Content ==== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#10B981] p-4 rounded-2xl shadow-lg">
            <FaStickyNote size={40} className="text-white" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-snug text-[#065F46]">
          Organize Your Ideas with <span className="text-[#10B981]">Notes Manager</span>
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-lg sm:text-xl mb-8 leading-relaxed">
          Securely store, manage, and organize your notes.  
          Add images, tags, and quickly search your personal notes with ease.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/signup"
            className="border-2 border-[#10B981] text-[#10B981] px-6 py-3 rounded-lg font-semibold hover:bg-[#10B981] hover:text-white transition-all duration-300 shadow-md"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border-2 border-[#10B981] text-[#10B981] px-6 py-3 rounded-lg font-semibold hover:bg-[#10B981] hover:text-white transition-all duration-300 shadow-md"
          >
            Login
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
