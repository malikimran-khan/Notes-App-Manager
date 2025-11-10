import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStickyNote } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

export default function Hero() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (token) navigate("/dashboard");
    else navigate("/signup");
  };
  const HandleLogin = ()=>{
    if (token) navigate("/dashboard");
    else navigate('/login')
    
  }

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-[#F0FDF4] to-white overflow-hidden">
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
          <div className="bg-[#10B981] p-4 rounded-2xl shadow-xl">
            <FaStickyNote size={40} className="text-white" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-snug text-[#065F46] drop-shadow-sm">
          Organize Your Ideas with{" "}
          <span className="text-[#10B981]">Notes Manager</span>
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-lg sm:text-xl mb-8 leading-relaxed">
          Securely store, manage, and organize your notes.  
          Add images, tags, and easily search your ideas anytime, anywhere.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={handleGetStarted}
            className="border-2 border-[#10B981] text-[#10B981] px-6 py-3 rounded-lg font-semibold hover:bg-[#10B981] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
            Get Started
          </button>

          <button
            onClick={HandleLogin}
            className="border-2 border-[#065F46] text-[#065F46] px-6 py-3 rounded-lg font-semibold hover:bg-[#065F46] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
            Login
          </button>
        </div>
      </motion.div>
    </section>
  );
}
