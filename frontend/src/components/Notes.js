import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext"; 

export default function Notes() {
    const context = useContext(NoteContext);
    if (!context) return <div>Loading...</div>; 

    const { notes } = context; 

    return (
        <div className="row">
            {notes?.map((note) => ( 
                <div className="col-md-3 mb-3" key={note._id}>
                    <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{note.title}</h5>
                            <h6 className="card-subtitle small mb-2 text-muted">
                                {new Date(note.date).toLocaleDateString()} {/* ✅ Formats date */}
                            </h6>
                            <p className="card-text">{note.description}</p>
                            <i className="fa-regular fa-pen-to-square mx-2"></i>
                            <i className="fa-solid fa-trash mx-2"></i>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
