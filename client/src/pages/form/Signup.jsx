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

export default function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation before sending to backend
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
        alert("🎉 Signup successful!");
        console.log("User:", data);
        localStorage.setItem("token", data.token);

        // Navigate to login page after successful signup
        navigate("/login");
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

        {/* Full Name */}
        <div className="flex items-center border rounded-lg mb-5 p-3 bg-gray-50 shadow-sm focus-within:ring-2 focus-within:ring-[#10B981] transition">
          <FaUser className="text-gray-400 mr-3" />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full outline-none bg-transparent placeholder-gray-400"
          />
        </div>

        {/* Email */}
        <div className="flex items-center border rounded-lg mb-5 p-3 bg-gray-50 shadow-sm focus-within:ring-2 focus-within:ring-[#10B981] transition">
          <FaEnvelope className="text-gray-400 mr-3" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full outline-none bg-transparent placeholder-gray-400"
          />
        </div>

        {/* Password */}
        <div className="flex items-center border rounded-lg mb-5 p-3 bg-gray-50 shadow-sm focus-within:ring-2 focus-within:ring-[#10B981] transition">
          <FaLock className="text-gray-400 mr-3" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full outline-none bg-transparent placeholder-gray-400"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex items-center border rounded-lg mb-6 p-3 bg-gray-50 shadow-sm focus-within:ring-2 focus-within:ring-[#10B981] transition">
          <FaLock className="text-gray-400 mr-3" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full outline-none bg-transparent placeholder-gray-400"
          />
        </div>

        {/* Submit */}
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
    </div>
  );
}
