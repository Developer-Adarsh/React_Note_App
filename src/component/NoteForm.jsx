import React from "react";

export default function NoteForm({
  title,
  setTitle,
  content,
  setContent,
  handleAdd,
  editingId,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
      >
        <div className="flex flex-col gap-3">
          <input
            className="border outline-none px-3 py-2 w-80 font-serif"
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            className="border rounded px-3 py-2 h-32 w-80 resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="border py-2 px-4 rounded-md hover:bg-blue-700 transition w-fit mb-4"
          >
            {editingId === null ? "Add Note" : "Save Note"}
          </button>
          <input
            className="border outline-none px-3 py-2 w-80 mb-5 font-serif"
            placeholder="Search Notes..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}
