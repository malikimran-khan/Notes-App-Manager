import Note from "../models/Note.js";
import path from "path";

export const createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content)
      return res.status(400).json({ message: "Title and content are required" });

    const tagsArray = tags ? tags.split(",").map((t) => t.trim()) : [];

    const note = await Note.create({
      user: req.user._id,
      title,
      content,
      tags: tagsArray,
      image: req.file
        ? `uploads/${req.file.filename}` // ✅ Use relative path
        : null,
    });

    res.status(201).json({ success: true, note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟡 Get all notes for logged-in user
export const getUserNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};
