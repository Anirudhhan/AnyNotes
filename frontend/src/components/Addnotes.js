import React, { useState } from "react";

export default function Addnotes() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card mb-5 shadow" style={{ width: "50%" }}>
        <div className="card-body">
          <input
            type="text"
            className="form-control mb-2 border-0"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ outline: "none", boxShadow: "none" }}
          />
          <textarea
            className="form-control mb-2 border-0"
            placeholder="Take a note..."
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ resize: "none", outline: "none", boxShadow: "none" }}
          />
          <button type="button" className="btn btn-outline-primary w-100">
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
}
