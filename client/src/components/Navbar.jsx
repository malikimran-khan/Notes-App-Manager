import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaStickyNote } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/20 border-b border-white/20 shadow-lg transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16">

          {/* ===== Brand / Logo ===== */}
          <Link
            to="/"
            className="flex items-center space-x-2 group transition-all duration-300"
          >
            <div className="bg-[#10B981] text-white p-2 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
              <FaStickyNote size={22} />
            </div>
            <span className="text-2xl font-extrabold tracking-wide">
              <span className="text-[#10B981]">Notes</span>
              <span className="text-white">App</span>
            </span>
          </Link>

          {/* ===== Desktop Links ===== */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="relative text-white font-medium transition-all duration-300 hover:text-[#10B981] after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-[#10B981] after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
            >
              Home
            </Link>
            <Link
              to="/notes"
              className="relative text-white font-medium transition-all duration-300 hover:text-[#10B981] after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-[#10B981] after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
            >
              My Notes
            </Link>
            <Link
              to="/create"
              className="px-5 py-2 rounded-lg bg-[#10B981] text-white font-semibold shadow-md hover:bg-[#0e946a] hover:shadow-lg transition-all duration-300"
            >
              + Add Note
            </Link>
          </div>

          {/* ===== Mobile Menu Button ===== */}
          <button
            className="md:hidden p-2 rounded-md text-white hover:text-[#10B981] transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* ===== Mobile Menu ===== */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white/10 backdrop-blur-lg border-t border-white/20 text-white">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 rounded-lg hover:bg-[#10B981]/20 transition"
          >
            Home
          </Link>
          <Link
            to="/notes"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 rounded-lg hover:bg-[#10B981]/20 transition"
          >
            My Notes
          </Link>
          <Link
            to="/create"
            onClick={() => setIsOpen(false)}
            className="block px-5 py-2 rounded-lg bg-[#10B981] text-white font-semibold shadow hover:bg-[#0e946a] transition"
          >
            + Add Note
          </Link>
        </div>
      )}
    </nav>
  );
}
