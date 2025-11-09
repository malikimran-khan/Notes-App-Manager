import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaStickyNote } from "react-icons/fa";
import { AuthContext } from "../pages/context/AuthContext"; // <-- Import your AuthContext

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { token } = useContext(AuthContext); // <-- Get token from context
  const navigate = useNavigate();

  // Scroll handler
  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false); // Scrolling down
    } else {
      setShowNavbar(true); // Scrolling up
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  // Handle Notes Hub click
  const handleNotesHubClick = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
    setIsOpen(false); // Close mobile menu if open
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/20 border-b border-white/20 shadow-lg transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16">

          {/* ===== Brand / Logo ===== */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 group cursor-pointer transition-all duration-300"
          >
            <div className="bg-[#10B981] text-white p-2 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
              <FaStickyNote size={22} />
            </div>
            <span className="text-2xl font-extrabold tracking-wide">
              <span className="text-[#10B981]">Notes</span>
              <span className="text-white">App</span>
            </span>
          </div>

          {/* ===== Desktop Button ===== */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleNotesHubClick}
              className="px-5 py-2 rounded-lg bg-[#10B981] text-white font-semibold shadow-md hover:bg-[#0e946a] hover:shadow-lg transition-all duration-300"
            >
              Notes Hub
            </button>
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
          <button
            onClick={handleNotesHubClick}
            className="block w-full text-left px-5 py-2 rounded-lg bg-[#10B981] text-white font-semibold shadow hover:bg-[#0e946a] transition"
          >
            Notes Hub
          </button>
        </div>
      )}
    </nav>
  );
}
