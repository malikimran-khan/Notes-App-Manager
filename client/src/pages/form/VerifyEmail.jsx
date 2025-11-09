import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle, FaSpinner } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifyEmail } = useContext(AuthContext); // ✅ Use Context API
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const result = await verifyEmail(token); // ✅ Context API function
        if (result.success) {
          setStatus("success");
          setMessage(result.message || "Email verified successfully! You can now log in.");

          // Auto-redirect to login after 5 seconds
          setTimeout(() => navigate("/login"), 5000);
        } else {
          setStatus("error");
          setMessage(result.message || "Verification link invalid or expired.");
        }
      } catch (err) {
        setStatus("error");
        setMessage(err.message || "Verification failed.");
      }
    };

    verifyUser();
  }, [token, navigate, verifyEmail]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#F0FDF4] text-center px-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#10B981]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#10B981]/10 rounded-full blur-3xl animate-pulse"></div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-2xl p-10 rounded-3xl max-w-md w-full z-10 border border-gray-100"
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          {status === "loading" && <FaSpinner className="text-[#10B981] text-5xl animate-spin" />}
          {status === "success" && <FaCheckCircle className="text-[#10B981] text-5xl" />}
          {status === "error" && <FaExclamationCircle className="text-red-500 text-5xl" />}
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-[#065F46] mb-2">
          {status === "loading"
            ? "Verifying Email..."
            : status === "success"
            ? "Email Verified!"
            : "Verification Failed"}
        </h2>

        {/* Message */}
        <p className="text-gray-700 mb-6">{message}</p>

        {/* Button (only for success/error) */}
        {(status === "success" || status === "error") && (
          <Link
            to="/login"
            className="inline-block bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300"
          >
            Go to Login
          </Link>
        )}
      </motion.div>

      {/* Auto-redirect text */}
      {status === "success" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-6 text-gray-500 text-sm"
        >
          Redirecting to login page in 5 seconds...
        </motion.p>
      )}
    </section>
  );
}
