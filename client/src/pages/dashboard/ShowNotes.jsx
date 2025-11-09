// src/pages/ShowNotes.jsx
import React, { useEffect, useContext } from "react";
import { NoteContext } from "../context/NoteContext";
export default function ShowNotes() {
  const { notes, loading, fetchNotes } = useContext(NoteContext);
  useEffect(() => {
    fetchNotes(); // fetch only once per token change
  }, [fetchNotes]);
  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading notes...
      </p>
    );
  }
  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7]">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#065F46] tracking-wide">
        Your Notes
      </h2>

      {notes.length === 0 ? (
        <p className="text-center text-gray-500 italic">No notes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-green-100"
            >
              {note.image && (
                <img
                  src={`http://localhost:5000/${note.image}`}
                  alt="note"
                  className="w-full h-44 object-cover rounded-xl mb-3"
                />
              )}

              <h3 className="text-xl font-semibold text-[#065F46] mb-1">
                {note.title}
              </h3>
              <p className="text-gray-700 text-sm mb-2 leading-relaxed">
                {note.content}
              </p>

              {note.tags?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {note.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-xs text-gray-400 mt-3">
                Created: {new Date(note.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
