import React from "react";

export default function NoteCard({
  note, // ✅ yeh ek hi note hai ab
  handleRemove,
  handlePinned,
  handleArchive,
  handleTrash,
  handleRestore,
  handleDeleteForever,
  isTrashView,
  handleEditing,
}) {
  return (
    <div className="border px-3 py-2 w-full mb-2">
      <p>
        <strong>Title:</strong> {note.title}
      </p>
      <p>
        <strong>Content:</strong> {note.content}
      </p>

      <div className="flex gap-3 mt-3">
        {isTrashView ? (
          <>
            <button
              onClick={() => handleRestore(note.id)}
              className="px-2 py-1 text-sm bg-green-500 text-white rounded-md"
            >
              Restore
            </button>
            <button
              onClick={() => handleDeleteForever(note.id)}
              className="px-2 py-1 text-sm bg-red-600 text-white rounded-md"
            >
              Delete Forever
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleRemove(note.id)}
              className="border py-1 px-2 bg-red-500 rounded font-semibold"
            >
              Remove
            </button>
            <button
              onClick={() => handlePinned(note.id)}
              className="border py-1 px-3 bg-blue-400  rounded font-semibold"
            >
              {note.pinned ? "Unpin" : "Pin"}
            </button>
            <button
              onClick={() => handleArchive(note.id)}
              className="border py-1 px-2 bg-green-500 rounded  font-semibold"
            >
              {note.archive ? "unArchive" : "Archive"}
            </button>
            <button
              onClick={() => handleTrash(note.id)}
              className="border py-1 px-2 bg-red-400 rounded font-semibold"
            >
              Trash
            </button>
          </>
        )}
        <button
          onClick={() => {handleEditing(note)}}
          className="border py-1 px-2 bg-yellow-400 rounded font-semibold"
        >
          ✏️
        </button>
      </div>
    </div>
  );
}
