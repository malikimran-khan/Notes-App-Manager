import React from "react";
import { FaStickyNote, FaCheckCircle, FaLock, FaCloudUploadAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className="relative w-full min-h-screen bg-[#F0FDF4] flex flex-col items-center text-center px-6 py-20 overflow-hidden">
      
      {/* Decorative Circles */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#10B981]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#10B981]/10 rounded-full blur-3xl animate-pulse"></div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-4xl"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-[#10B981] p-4 rounded-2xl shadow-lg">
            <FaStickyNote size={40} className="text-white" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#065F46] mb-6">
          Welcome to <span className="text-[#10B981]">Notes Manager</span>
        </h1>

        <p className="text-gray-700 text-lg sm:text-xl mb-8 leading-relaxed">
          Organize your thoughts, tasks, and important information in one secure and easy-to-use platform. 
          Create notes with optional images, tags, and categories. Only you have access to your notes, ensuring complete privacy.
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-[#065F46] mt-10">
          <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition">
            <FaCheckCircle size={40} className="text-[#10B981] mb-3" />
            <h3 className="font-bold text-lg mb-2">Easy Organization</h3>
            <p>Create, edit, and categorize notes to manage your tasks efficiently.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition">
            <FaLock size={40} className="text-[#10B981] mb-3" />
            <h3 className="font-bold text-lg mb-2">Secure & Private</h3>
            <p>Only logged-in users can access their notes. Your data is protected.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition">
            <FaCloudUploadAlt size={40} className="text-[#10B981] mb-3" />
            <h3 className="font-bold text-lg mb-2">Image & Cloud Support</h3>
            <p>Attach images to notes and access them anywhere with cloud sync.</p>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 text-left bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-[#065F46] mb-4">Why Choose Notes Manager?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Search notes by title or tags</li>
            <li>Optional dark mode for comfortable reading</li>
            <li>Responsive design for all devices</li>
            <li>Clean and intuitive user interface</li>
            <li>Organize notes with images and categories</li>
          </ul>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 text-gray-400 text-sm"
      >
        ✨ Notes Manager App — Organize your ideas, tasks, and important information
      </motion.p>
    </section>
  );
}
