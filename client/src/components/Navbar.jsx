import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaStickyNote } from "react-icons/fa";
import { AuthContext } from "../pages/context/AuthContext";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Scroll hide/show effect
  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) setShowNavbar(false);
    else setShowNavbar(true);
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  // Handle Notes Hub navigation
  const handleNotesHubClick = () => {
    token ? navigate("/dashboard") : navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-gradient-to-r from-[#065F46]/90 to-[#10B981]/90 border-b border-white/20 shadow-lg transition-transform duration-300 ${
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
            <div className="bg-white p-2 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
              <FaStickyNote size={22} className="text-[#10B981]" />
            </div>
            <span className="text-2xl font-extrabold tracking-wide text-white">
              <span className="text-white">Notes</span>
              <span className="text-[#D1FAE5]">Hub</span>
            </span>
          </div>

          {/* ===== Single Responsive Button ===== */}
          <button
            onClick={handleNotesHubClick}
            className="px-5 py-2 rounded-lg bg-white text-[#065F46] font-semibold shadow-md hover:bg-[#F0FDF4] hover:scale-105 active:scale-95 transition-all duration-300 text-sm sm:text-base"
          >
            Notes Hub
          </button>
        </div>
      </div>
    </nav>
  );
}
