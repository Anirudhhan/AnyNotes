import React, { useState } from "react";
import NoteContext from "./NoteContext";

export default function NoteState(props) {
    const URL = "http://localhost:8000/api/notes/";
    
    // fetching notes
    const fetchNotes = async () => {
      const url = `${URL}/fetchnotes`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkNjdmNTJkYzM2YTE1YWFhMjViNDM4In0sImlhdCI6MTc0MjExMDU0Nn0.I-avBgqW2eC_cJhteluAsImIuX7p34v-EhyrJn0jaJs",
          },
        });
  
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
  
        const json = await response.json();
        console.log(json)
        setNotes(json);
      } catch (error) {
        console.error(error.message);
      }
    };

    const [notes, setNotes] = useState([])

    //Add Note
    const addNote = (title, description) =>{
      let note = {
        "_id": "67d828d320763a2c7299b72",
        "user": "67d67f52dc36a15aaa25b438",
        "title": title,
        "description": description + "[added]",
        "tag": "personal",
        "date": "2025-03-17T13:51:15.028Z",
        "__v": 0
      };

      setNotes([note, ...notes]);;
    }

    //Delete note
    const deleteNote = (id) => {
      const deletingNote = notes.filter((note)=>{return note._id !== id})
      setNotes(deletingNote)
      console.log(id);
    }

    //Edit Note
    const editNote = (id, title, description) => {
      
      for (let i = 0; i < notes.length; i++) {
        const targetNote = notes[i];
        if (targetNote._id === id) {
          targetNote.title = title;
          targetNote.description = description;
          break;
        }
      }
    }
  
    return (
      <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, fetchNotes}}>
          {props.children}
      </NoteContext.Provider>
    )
  }
