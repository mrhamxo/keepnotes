import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import { AddNote } from './AddNote';
import { NoteItem } from './NoteItem';

export const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context;

  useEffect((value) => {
    if (localStorage.setItem('token', value.token)) {
      getNotes();
    }
    else{
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", edittitle: "", editdescription: "", edittag: "" });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, edittitle: currentNote.title, editdescription: currentNote.description, edittag: currentNote.tag});
  }

  const handleClick = (e) => {
    console.log("updated", note);
    // e.preventDefault();
    editNote(note.id, note.edittitle, note.editdescription, note.edittag);
    refClose.current.click();
    props.showAlert("Edited Successfully", "info");
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="edittitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="edittitle" name='edittitle' aria-describedby="emailHelp" value={note.edittitle} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="editdescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="editdescription" name='editdescription' value={note.editdescription} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edittag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="edittag" name='edittag' value={note.edittag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.edittitle.length<5 || note.editdescription.length<5} type="button" onClick={handleClick} className="btn btn-danger">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container row">
        <h2>My Notes</h2>
        <div className="container">
          {notes.length === 0 && <h5>No Notes Found</h5>}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
        })}
      </div>
    </>
  )
}
