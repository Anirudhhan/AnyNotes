import React, { useState } from "react";
import NoteContext from "./NoteContext";

export default function NoteState(props) {
    const notesInitial = [
      {
        "_id": "67d828bc20763a2c57299b70",
        "user": "67d67f52dc36a15aaa25b438",
        "title": "my title test2",
        "description": "my trial app is this",
        "tag": "personal",
        "date": "2025-03-17T13:50:52.231Z",
        "__v": 0
      },
      {
        "_id": "67d828d320763a2c57299b72",
        "user": "67d67f52dc36a15aaa25b438",
        "title": "my title test2",
        "description": "my trial app is this",
        "tag": "personal",
        "date": "2025-03-17T13:51:15.028Z",
        "__v": 0
      }
    ]
  
    const [notes, setNotes] = useState(notesInitial)
    return (
      <NoteContext.Provider value={{notes, setNotes}}>
          {props.children}
      </NoteContext.Provider>
    )
  }
