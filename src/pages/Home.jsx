import React, { useEffect, useState } from "react";
import NoteForm from "../component/NoteForm";
import NoteCard from "../component/NoteCard";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });



  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAdd = () => {
     if (!title.trim() && !content.trim()) return;
    if (editingId !== null) {
      const updatedNotes = notes.map((note) => {
        return note.id === editingId ? { ...note, title, content } : note;
      });
      setNotes(updatedNotes);
      setEditingId(null);
      setTitle("");
      setContent("");
    } else {
      const newNotes = {
        id: Date.now(),
        title: title,
        content: content,
        pinned: false,
        archive: false,
        trashed: false,
      };
      setNotes((prevState) => [...prevState, newNotes]);
    }

  };

  const handleRemove = (removeId) => {
    const filteredNote = notes.filter((note) => removeId !== note.id);
    setNotes(filteredNote);
  };

  const handlePinned = (pinId) => {
    const updatedNotes = notes
      .map((note) =>
        pinId === note.id ? { ...note, pinned: !note.pinned } : note
      )
      .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    setNotes(updatedNotes);
  };

  const handleArchive = (archiveId) => {
    const filteredArchive = notes.map((note) =>
      archiveId === note.id ? { ...note, archive: !note.archive } : note
    );
    setNotes(filteredArchive);
  };

  const activeNotes = notes.filter(
  (n) =>
    !n.archive &&
    !n.trashed &&
    (n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     n.content.toLowerCase().includes(searchTerm.toLowerCase()))
);

  const archiveNotes = notes.filter(
  (n) =>
    n.archive &&
    !n.trashed &&
    (n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     n.content.toLowerCase().includes(searchTerm.toLowerCase()))
);


  const handleTrash = (trashId) => {
    const updated = notes.map((note) => {
      if (trashId === note.id) {
        return { ...note, trashed: true };
      }
      return note;
    });
    setNotes(updated);
  };

  const trashedNotes = notes.filter((n) => n.trashed);

  const handleRestore = (id) => {
    const updated = notes.map((note) => {
      if (id === note.id) {
        return { ...note, trashed: false };
      }
      return note;
    });
    setNotes(updated);
  };

  const handleDeleteForever = (id) => {
    const updated = notes.filter((note) => note.id !== id);
    setNotes(updated);
  };

  const handleEditing = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  // const filteredNotes = notes.filter(
  //   (note) =>
  //     note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     note.content.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div>
      <NoteForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        handleAdd={handleAdd}
        editingId={editingId}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        />
      <h2 className="text-xl font-bold mb-2">📝 Active Notes</h2>
      {activeNotes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          handleRemove={handleRemove}
          handlePinned={handlePinned}
          handleArchive={handleArchive}
          handleTrash={handleTrash}
          handleEditing={handleEditing}
        />
      ))}

      <h2 className="text-xl font-bold mt-6 mb-2">📦 Archived Notes</h2>
      {archiveNotes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          handleRemove={handleRemove}
          handlePinned={handlePinned}
          handleArchive={handleArchive}
          handleTrash={handleTrash}
          handleEditing={handleEditing}
        />
      ))}

      <h2>🗑️ Trash</h2>
      {trashedNotes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          handleTrash={handleTrash}
          handleRestore={handleRestore}
          handleDeleteForever={handleDeleteForever}
          isTrashView={true}
          handleEditing={handleEditing}
        />
      ))}
    </div>
  );
}
