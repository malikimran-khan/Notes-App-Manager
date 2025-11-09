import React, { useEffect, useContext, useState } from "react";  
import { NoteContext } from "../context/NoteContext";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ShowNotes() {
  const { notes, loading, fetchNotes, deleteNote, updateNote } = useContext(NoteContext);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "", tags: "", image: null });
  const [preview, setPreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      await deleteNote(id);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      tags: note.tags.join(", "),
      image: null,
    });
    setPreview(note.image ? `http://localhost:5000/${note.image}` : null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files && files[0] ? files[0] : null;
      setFormData((prev) => ({ ...prev, image: file }));
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim() || !formData.tags.trim()) return;
    await updateNote(editingNote._id, formData);
    setEditingNote(null);
  };

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Filter notes by title or tag
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse text-lg">
        Loading notes...
      </p>
    );

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7]">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by title or tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#10B981] outline-none"
        />

        {/* Add Note Button */}
        <button
          onClick={() => navigate("/dashboard/create-notes")}
          className="flex items-center gap-2 px-5 py-3 bg-[#10B981] hover:bg-[#059669] text-white font-semibold rounded-xl transition"
        >
          <FaPlus /> Add Note
        </button>
      </div>

      {filteredNotes.length === 0 ? (
        <p className="text-center text-gray-500 italic text-lg">No notes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNotes.map((note) => (
            <motion.div
              key={note._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, boxShadow: "0 15px 25px rgba(0,0,0,0.2)" }}
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-green-100 flex flex-col"
            >
              {note.image && (
                <img
                  src={`http://localhost:5000/${note.image}`}
                  alt="note"
                  className="w-full h-60 object-cover"
                />
              )}

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#065F46] mb-2">{note.title}</h3>
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">{note.content}</p>

                  {note.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {note.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-[#DCFCE7] text-[#065F46] px-3 py-1 rounded-full font-semibold"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-3">
                  <p className="text-xs text-gray-400">
                    {new Date(note.createdAt).toLocaleString()}
                  </p>
                  <div className="flex gap-3">
                    <button onClick={() => handleEdit(note)}>
                      <FaEdit className="text-[#10B981] hover:text-[#059669] text-lg transition-all" />
                    </button>
                    <button onClick={() => handleDelete(note._id)}>
                      <FaTrash className="text-red-500 hover:text-red-700 text-lg transition-all" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      <AnimatePresence>
        {editingNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 relative"
            >
              <h2 className="text-2xl font-bold mb-5 text-[#065F46]">Update Note</h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#10B981] outline-none"
                />
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Content"
                  rows={5}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#10B981] outline-none"
                />
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Tags (comma separated)"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#10B981] outline-none"
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-xl"
                />
                {preview && (
                  <img src={preview} alt="preview" className="w-full h-44 object-cover rounded-2xl mt-2" />
                )}
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => setEditingNote(null)}
                    className="px-5 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-semibold transition"
                  >
                    Update
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
