import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function Addnotes() {
  const context = useContext(NoteContext);
  const {addNote} = context;

  const [note, setNote] = useState({title: "", description: ""});

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
          <button type="button" className="btn btn-outline-primary w-100" onClick={()=>{ addNote(note.title, note.description); setNote({ title: "", description: "" });}}>
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
}
