import React, { useContext, useState, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import Addnotes from "./Addnotes";

export default function Notes() {
  const context = useContext(NoteContext);
  const [showAddNote, setShowAddNote] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const { notes, deleteNote, fetchNotes } = context;
  // Fetch notes when component mounts
  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="row">
      <i
        className="fa-solid fa-pen mb-3"
        onClick={() =>{setCurrentNote(null); setShowAddNote(!showAddNote);}}
      ></i>
      {showAddNote && <Addnotes updatingNote={currentNote} setShowAddNote = {setShowAddNote} />}
  
      {notes?.slice().reverse().map((note) => (
        <div className="col-md-3 mb-3" key={note._id}>
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{note.title}</h5>
              <p className="card-text">{note.description}</p>
              <h6 className="card-subtitle small mb-2 text-muted"  style={{ fontSize: "12px" }}>
              {new Date(note.date).toLocaleString()} 
              </h6>
              <i className="fa-regular fa-pen-to-square mx-2" onClick={() => {setCurrentNote(note); setShowAddNote(!showAddNote)}}></i>
              <i
                className="fa-solid fa-trash mx-2"
                onClick={() => deleteNote(note._id)}
              ></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );  
}
