import React from "react";

export default function Spinner({ size = 16, className = "" }) {
  const dimension = `${size}px`;
  return (
    <span
      className={`inline-block align-middle border-2 border-white/70 border-t-transparent rounded-full animate-spin ${className}`}
      style={{ width: dimension, height: dimension }}
      aria-label="Loading"
    />
  );
}


