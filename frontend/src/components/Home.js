import React, { useState } from "react";
import Notes from "./Notes";
import Addnotes from "./Addnotes";

export default function Home() {
  const [showAddNote, setShowAddNote] = useState(false);

  return (
    <div className="container my-4">
      <h2>
        Notes
      </h2>
      <i className="fa-solid fa-pen mb-3"
          style={{ cursor: "pointer" }}
          onClick={() => setShowAddNote(!showAddNote)}
        ></i>

      <div
        className={`transition-div ${showAddNote ? "show" : ""}`}
      >
        {showAddNote && <Addnotes />}
      </div>
      <Notes />
    </div>
  );
}
