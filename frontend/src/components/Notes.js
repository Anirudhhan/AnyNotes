import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext"; 

export default function Notes() {
    const context = useContext(NoteContext);
    if (!context) return <div>Loading...</div>; // ✅ Handle undefined context

    const { notes } = context; 

    return (
        <div className="row">
            {notes?.map((note) => ( // ✅ Prevents errors if notes is undefined
                <div className="col-md-3 mb-3" key={note._id}>
                    <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{note.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {new Date(note.date).toLocaleDateString()} {/* ✅ Formats date */}
                            </h6>
                            <p className="card-text">{note.description}</p>
                            <a href="/" className="card-link">Card link</a>
                            <a href="/" className="card-link">Another link</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
