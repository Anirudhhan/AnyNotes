import React, { useContext, useState, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";
import Addnotes from "./Addnotes";

export default function Notes() {
  const context = useContext(NoteContext);
  const [showAddNote, setShowAddNote] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const { notes, deleteNote, fetchNotes } = context;
  const navigate = useNavigate();

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if no token
      return;
    }

    fetchNotes().catch(() => {
      console.error("Error fetching notes, possibly invalid token");
      localStorage.removeItem("token"); // Clear invalid token
      navigate("/login"); // Redirect if unauthorized
    });
    // eslint-disable-next-line
  }, []);
  

  return (
    <div className="row">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h5 className="mb-0">Your Notes</h5>
        <button
          className="btn btn-outline-primary btn-sm d-flex align-items-center"
          onClick={() => {
            setCurrentNote(null);
            setShowAddNote(!showAddNote);
          }}
        >
          <i className="fa-solid fa-pen me-2"></i>
          {showAddNote ? "Cancel" : "Add Note"}
        </button>
      </div>
      {showAddNote && <Addnotes updatingNote={currentNote} setShowAddNote = {setShowAddNote} />}
  
      {notes?.length > 0 ? (
        notes.slice().reverse().map((note) => (
          <div className="col-md-3 mb-3" key={note._id}>
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <h6 className="card-subtitle small mb-2 text-muted" style={{ fontSize: "12px" }}>
                  {new Date(note.date).toLocaleString()}
                </h6>
                <i
                  className="fa-regular fa-pen-to-square mx-2"
                  onClick={() => {
                    setCurrentNote(note);
                    setShowAddNote(!showAddNote);
                  }}
                ></i>
                <i
                  className="fa-solid fa-trash mx-2"
                  onClick={() => deleteNote(note._id)}
                ></i>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Notes you add appear here</p>
      )}
    </div>
  );  
}
