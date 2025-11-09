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

export const updateNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags.split(",").map((t) => t.trim());
    if (req.file) note.image = `uploads/${req.file.filename}`;

    await note.save();
    res.status(200).json({ success: true, note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update note" });
  }
};

// ✅ Delete Note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ success: true, message: "Note deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete note" });
  }
};