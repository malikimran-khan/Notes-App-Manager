import React, { useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // adjust path if needed
import { FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); 
  const handleLogout = () => {
    logout(); // clears token 
    navigate("/"); 
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F0FDF4] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center"
      >
        <FaSignOutAlt size={50} className="mx-auto text-[#10B981] mb-6" />
        <h1 className="text-3xl font-bold text-[#065F46] mb-4">
          Logout
        </h1>
        <p className="text-gray-600 mb-6">
          Click the button below to securely log out from your account.
        </p>
        <button
          onClick={handleLogout}
          className="bg-[#10B981] hover:bg-[#059669] text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
        >
          Logout Now
        </button>
      </motion.div>
    </section>
  );
}
