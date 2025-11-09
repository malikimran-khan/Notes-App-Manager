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

  // ✅ Fetch Notes
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
  }, [token]);

  // ✅ Delete Note
  const deleteNote = async (id) => {
    if (!token) return { success: false, message: "Not authorized" };
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prev) => prev.filter((note) => note._id !== id));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Failed to delete note",
      };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update Note
  const updateNote = async (id, updatedData) => {
    if (!token) return { success: false, message: "Not authorized" };
    setLoading(true);
    try {
      const payload = new FormData();
      if (updatedData.title) payload.append("title", updatedData.title);
      if (updatedData.content) payload.append("content", updatedData.content);
      if (updatedData.tags) payload.append("tags", updatedData.tags);
      if (updatedData.image) payload.append("image", updatedData.image);

      const res = await axios.put(`http://localhost:5000/api/notes/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setNotes((prev) => prev.map((note) => (note._id === id ? res.data.note : note)));
      return { success: true, note: res.data.note };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Failed to update note",
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        createNote,
        fetchNotes,
        deleteNote,
        updateNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
