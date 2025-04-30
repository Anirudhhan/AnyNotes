import React, { useState, useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function Addnotes({updatingNote, setShowAddNote}) {
  const context = useContext(NoteContext);
  const {addNote, updateNote} = context;

  const [note, setNote] = useState({title: "", description: ""});

  const handleSubmit = () => {
    if (updatingNote === null) {
      addNote(note.title, note.description); 
    } else {
      updateNote(note._id, note.title, note.description); 
      setShowAddNote(!setShowAddNote);
    }
    setNote({ title: "", description: "" }); 
  };

  useEffect(() => {
    if (updatingNote !== null) {
      setNote(updatingNote); // Populate the note state with updatingNote
    }
  }, [updatingNote]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card mb-5 shadow" style={{ width: "50%" }}>
        <div className="card-body">
          <input
            type="text"
            className="form-control mb-2 border-0"
            placeholder="Title"
            name = "title"
            value={note.title}
            onChange={(e) => setNote({...note, [e.target.name]: e.target.value})}
            style={{ outline: "none", boxShadow: "none" }}
          />
          <textarea
            className="form-control mb-2 border-0"
            placeholder="Take a note..."
            name = "description"
            value={note.description}
            rows="3"
            onChange={(e) => setNote({...note, [e.target.name]: e.target.value})}
            style={{ resize: "none", outline: "none", boxShadow: "none" }}
          />
          <button type="button" className="btn btn-outline-primary w-100" onClick={handleSubmit}>
          {(updatingNote === null) ? "Add Note" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
