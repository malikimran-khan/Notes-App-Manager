// src/context/NoteContext.jsx
import React, { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Create Note
  const createNote = async (formData) => {
    if (!token) return { success: false, message: "Not authorized" };
    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("content", formData.content);
      payload.append("tags", formData.tags);
      if (formData.image) payload.append("image", formData.image);

      const res = await axios.post("http://localhost:5000/api/notes/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setNotes((prev) => [res.data.note, ...prev]);
      return { success: true, message: "Note created successfully" };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Failed to create note",
      };
    } finally {
      setLoading(false);
    }
  };

  // Fetch Notes (memoized)
  const fetchNotes = useCallback(async () => {
    if (!token) return { success: false, message: "Not authorized" };
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/notes/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data.notes || []);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Failed to fetch notes",
      };
    } finally {
      setLoading(false);
    }
  }, [token]); // only re-create when token changes

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        createNote,
        fetchNotes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
