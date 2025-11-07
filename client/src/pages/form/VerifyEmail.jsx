import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/verify/${token}`);
        setMessage(res.data.message || "Email verified successfully! You can now log in.");
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Verification link invalid or expired."
        );
      }
    };
    verifyUserEmail();
  }, [token]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #007BFF, #00C6FF)",
        color: "white",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          padding: "2rem 3rem",
          borderRadius: "15px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
        }}
      >
        <h2>Email Verification</h2>
        <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>{message}</p>
      </div>
    </div>
  );
}
