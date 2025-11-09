import React, { useState, useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import Spinner from "../../components/Spinner";

export default function CreateNotes() {
  const { createNote, loading } = useContext(NoteContext);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    tags: "",
  });
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files?.[0] || null;
      setFormData((p) => ({ ...p, image: file }));
      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!formData.title || !formData.content || !formData.tags) {
      return setMessage({ type: "error", text: "Please fill all required fields." });
    }

    const res = await createNote(formData);
    if (res.success) {
      setMessage({ type: "success", text: res.message });
      setFormData({ title: "", content: "", image: null, tags: "" });
      setPreview(null);
    } else {
      setMessage({ type: "error", text: res.message });
    }
  };

  return (
    <section className="min-h-screen bg-[#F0FDF4] flex items-start justify-center px-4 py-12">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-[#065F46] text-center mb-6">
          Create <span className="text-[#10B981]">New Note</span>
        </h2>

        {message && (
          <div
            className={`mb-4 px-4 py-3 rounded-lg text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-100"
                : "bg-red-50 text-red-700 border border-red-100"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981]"
          />
          {/* Content */}
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your note..."
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#10B981]"
          />
          {/* Tags */}
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Work, Personal, Study"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981]"
          />
          {/* Image */}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2 cursor-pointer"
          />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-3 rounded-lg w-full h-48 object-cover border"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition duration-300 shadow-md flex items-center justify-center ${
              loading
                ? "bg-[#10B981]/70 cursor-not-allowed text-white"
                : "bg-[#10B981] hover:bg-[#059669] text-white"
            }`}
          >
            {loading ? (
              <>
                <Spinner size={18} className="mr-2" /> Creating...
              </>
            ) : (
              "Create Note"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
