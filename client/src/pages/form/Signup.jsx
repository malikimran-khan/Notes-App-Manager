import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import Spinner from "../../components/Spinner";
import { motion, AnimatePresence } from "framer-motion";

export default function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      alert("All fields are required!");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (form.password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        // Instead of alert, show modal for verification info
        setShowVerificationModal(true);
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerificationOk = () => {
    setShowVerificationModal(false);
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F0FDF4] px-4">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white shadow-2xl p-10 rounded-3xl w-full max-w-md text-gray-800 border border-gray-200 overflow-hidden"
      >
        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#10B981]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#10B981]/10 rounded-full blur-3xl animate-pulse"></div>

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <FaUserPlus className="text-6xl text-[#10B981] mb-3" />
          <h2 className="text-3xl font-extrabold text-[#065F46] mb-1">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm text-center">
            Join to start managing your notes
          </p>
        </div>

        {/* Inputs */}
        {["fullName", "email", "password", "confirmPassword"].map((field, i) => {
          const icons = [<FaUser />, <FaEnvelope />, <FaLock />, <FaLock />];
          const placeholders = ["Full Name", "Email", "Password", "Confirm Password"];
          const types = ["text", "email", "password", "password"];
          return (
            <div
              key={i}
              className="flex items-center border rounded-lg mb-5 p-3 bg-gray-50 shadow-sm focus-within:ring-2 focus-within:ring-[#10B981] transition"
            >
              <span className="text-gray-400 mr-3">{icons[i]}</span>
              <input
                type={types[i]}
                name={field}
                placeholder={placeholders[i]}
                value={form[field]}
                onChange={handleChange}
                required
                className="w-full outline-none bg-transparent placeholder-gray-400"
              />
            </div>
          );
        })}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-3 rounded-xl font-semibold transition duration-300 shadow-md flex items-center justify-center ${
            submitting
              ? "bg-[#10B981]/70 cursor-not-allowed text-white"
              : "bg-[#10B981] hover:bg-[#059669] text-white"
          }`}
        >
          {submitting ? (
            <>
              <Spinner size={18} className="mr-2" /> Signing Up...
            </>
          ) : (
            "Signup"
          )}
        </button>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#10B981] font-semibold hover:underline inline-flex items-center"
          >
            <FaSignInAlt className="mr-1" /> Login
          </Link>
        </p>
      </form>

      {/* ✅ Verification Modal */}
      <AnimatePresence>
        {showVerificationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-[#10B981]/30"
            >
              <FaEnvelope className="text-[#10B981] text-5xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#065F46] mb-3">
                Account Verification
              </h2>
              <p className="text-gray-600 mb-6">
                We've sent a verification link to your email account.  
                Please verify your email to activate your account.
              </p>
              <button
                onClick={handleVerificationOk}
                className="bg-[#10B981] hover:bg-[#059669] text-white py-2 px-6 rounded-xl font-semibold shadow-md transition"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
