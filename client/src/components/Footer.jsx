import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaStickyNote,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-[#065F46] text-[#DCFCE7] font-['Poppins'] pt-16 pb-12 overflow-hidden">
      
      {/* Decorative Top Curve */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-20 text-[#065F46]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.21-30.13,172-41.79C636,1.78,712,1.16,787.52,19.45c78.06,18.91,153.59,56.84,231.41,73.85,61,13.28,122.24,12.6,181.07-4.25V120H0V96.52A600.36,600.36,0,0,0,321.39,56.44Z"
            fill="#10B981"
          />
        </svg>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 px-6 relative z-10">
        
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
            <FaStickyNote className="text-[#10B981]" /> Notes Manager
          </h2>
          <p className="text-[#DCFCE7]/90 text-sm leading-relaxed">
            Keep all your notes organized with our secure, fast, and user-friendly app. Add images, tags, and categories effortlessly.
          </p>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
          <ul className="space-y-2 text-sm">
            {["Add & Edit Notes", "Tag & Categorize", "Image Upload", "Search & Filter"].map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 6, color: "#10B981" }}
                className="cursor-pointer transition-all text-[#DCFCE7]/90"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-[#10B981]" />
              support@notesmanager.com
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#10B981]" />
              +92 308 5029266
            </li>
            <li className="flex items-center gap-3">
              <FaStickyNote className="text-[#10B981]" />
              Faisalabad, Pakistan
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-5 text-2xl">
            <motion.a
              href="https://github.com/"
              target="_blank"
              whileHover={{ scale: 1.2, color: "#10B981" }}
              transition={{ duration: 0.3 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://linkedin.com/"
              target="_blank"
              whileHover={{ scale: 1.2, color: "#10B981" }}
              transition={{ duration: 0.3 }}
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="mailto:support@notesmanager.com"
              whileHover={{ scale: 1.2, color: "#10B981" }}
              transition={{ duration: 0.3 }}
            >
              <FaEnvelope />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-12 border-t border-[#10B981]/30 pt-6 relative z-10">
        <h4 className="text-[#10B981] text-lg italic font-medium">
          “Organize your ideas. Simplify your life.”
        </h4>
        <p className="text-[#DCFCE7]/80 text-sm mt-2">
          © {new Date().getFullYear()} Notes Manager — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
