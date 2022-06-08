import NoteContext from './noteContext'
import React, { useState } from 'react';

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes to the notes array
  const getNotes = async() => {
    // TODO: API call to get all notes array
    const response = await fetch(`${host}/api/Notes/fetchallnotes/`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'token'
      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json)
  }

  // Add a new note to the notes array
  const addNote = async(title, description, tag) => {
    // TODO: API call to add a new note
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'token'
      },
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });
    const note = await response.json();
    setNotes(notes.concat(note));
    console.log("added note");
  }

  // Edit an existing note in the notes array
  const editNote = async (id, title, description, tag) => {
    // TODO: API call to edit note
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'token'
      },
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    // logic for edit note in client side
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  // Delete a note from the notes array
  const deleteNote = async(id) => {
    // TODO: API call to delete note
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'token'
      },
    });
    const json = await response.json();
    console.log(json);

    console.log("delete note" + id);
    const newNotes = notes.filter(note => {
      return note._id !== id;
    });
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;