import React, { useState } from "react"; 
import { Link, useLocation } from "react-router-dom";
import { 
  FaTachometerAlt, FaPlusCircle, FaList, FaSignOutAlt, FaBars, FaTimes
} from "react-icons/fa";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/dashboard/create-notes", label: "Create Notes", icon: <FaPlusCircle /> },
    { path: "/dashboard/show-notes", label: "Show Notes", icon: <FaList /> },
    { path: "/dashboard/logout", label: "Logout", icon: <FaSignOutAlt /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-full bg-[#10B981] text-white shadow-lg hover:bg-[#059669] transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#F0FDF4] border-r border-[#10B981]/30 shadow-lg p-6 transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center mb-12">
          <div className="bg-[#10B981] w-12 h-12 flex items-center justify-center rounded-2xl shadow-md">
            <FaTachometerAlt className="text-white text-xl" />
          </div>
          <h2 className="ml-3 text-2xl font-extrabold text-[#065F46]">Notes App</h2>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-300
                ${location.pathname === link.path 
                  ? "bg-[#10B981]/20 text-[#065F46] font-bold" 
                  : "text-[#065F46] hover:bg-[#10B981]/10 hover:text-[#10B981]"}`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
