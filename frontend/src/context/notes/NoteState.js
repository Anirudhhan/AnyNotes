import React, { useState } from "react";
import NoteContext from "./NoteContext";

export default function NoteState(props) {
    const URL = "http://localhost:8000/api/notes";
    
    // fetching notes
    const fetchNotes = async () => {
      const url = `${URL}/fetchnotes`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              localStorage.getItem("token"),
          },
        });
  
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
  
        const json = await response.json();
        setNotes(json)
      } catch (error) {
        console.error(error.message);
      }
    };

    const [notes, setNotes] = useState([]);

    // Add Note
    const addNote = async (title, description, resetForm) => {
      const url = `${URL}/add-note`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              localStorage.getItem("token"),
          },
          body: JSON.stringify({ title, description }),
        });
    
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const newNote = await response.json();

        setNotes([...notes, newNote]);
    
      } catch (error) {
        alert("Failed to add note. Please try again.");
        console.error(error.message);
      }
    };
    

    //Delete note
    const deleteNote = async (id) => {
      const url = `${URL}/delete-note/${id}`;
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              localStorage.getItem("token"),
          },
        });
    
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const deletingNote = notes.filter((note)=>{return note._id !== id})
        setNotes(deletingNote)
    
      } catch (error) {
        alert("Failed to Delete note. Please try again.");
        console.error(error.message);
      }
    }

    //Edit Note
    const updateNote = async (id, title, description) => {

      const url = `${URL}/update-note/${id}`;
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              localStorage.getItem("token"),
          },
          body: JSON.stringify({ title, description })
        });
    
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === id ? { ...note, title, description } : note
          )
        );    

      } catch (error) {
        alert("Failed to Update note. Please try again.");
        console.error(error.message);
      }
      
    }
  
    return (
      <NoteContext.Provider value={{notes, addNote, deleteNote, updateNote, fetchNotes}}>
          {props.children}
      </NoteContext.Provider>
    )
  }
