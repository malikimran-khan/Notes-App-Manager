import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  // ✅ Save token to localStorage when updated
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // ✅ Signup function
  const signup = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      setLoading(false);
      return { success: true, message: res.data.message };
    } catch (err) {
      setLoading(false);
      return { success: false, message: err.response?.data?.message || "Signup failed" };
    }
  };

  // ✅ Login function
  const login = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      setToken(res.data.token);
      setUser(res.data.user);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  // ✅ Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  // ✅ Verify Email
  const verifyEmail = async (token) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/auth/verify/${token}`);
      return { success: true, message: res.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Invalid or expired token" };
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signup, login, logout, verifyEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
