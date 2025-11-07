import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  FaEnvelope, 
  FaLock, 
  FaUserPlus, 
  FaSignInAlt, 
  FaExclamationCircle 
} from "react-icons/fa";
import Spinner from "../../components/Spinner";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Example backend endpoint (change to your actual API)
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      // ✅ Save token in localStorage
      localStorage.setItem("token", data.token);

      // ✅ Navigate to protected page (e.g. About)
      navigate("/about");
    } catch (err) {
      setError(err.message);
      console.error("Login Error:", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F0FDF4] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl p-10 rounded-3xl w-full max-w-md text-gray-800 border border-gray-200 relative overflow-hidden"
      >
        {/* Floating Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#10B981]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#10B981]/10 rounded-full blur-3xl animate-pulse"></div>

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <FaSignInAlt className="text-6xl text-[#10B981] mb-3" />
          <h2 className="text-3xl font-extrabold text-[#065F46] mb-1">Welcome Back</h2>
          <p className="text-gray-500 text-sm text-center">
            Login to continue to your Notes App
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            <FaExclamationCircle className="mr-2" />
            <span>{error}</span>
          </div>
        )}

        {/* Email Input */}
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

        {/* Password Input */}
        <div className="flex items-center border rounded-lg mb-6 p-3 bg-gray-50 shadow-sm focus-within:ring-2 focus-within:ring-[#10B981] transition">
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
              <Spinner size={18} className="mr-2" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#10B981] font-semibold hover:underline inline-flex items-center"
          >
            <FaUserPlus className="mr-1" /> Register
          </Link>
        </p>
      </form>
    </div>
  );
}
