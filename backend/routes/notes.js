const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//Route 1: Get all the notes using GET method: "/api/notes/fetchallnotes" login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        return res.json(notes);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send('Internal Server Error');
    }
});
//Route 2: Add a new note using POST method: "/api/notes/addnote" login required
router.post('/addnote', fetchuser, [
    body('title', 'Title must be atleast 3 letters').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 letters').isLength({ min: 5 })
], async (req, res) => {

    //if there is an error, return the bad request status code and the error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //create a new note
    const { title, description, tag } = req.body;
    try {
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const saveNote = await note.save();
        return res.json(saveNote);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send('Internal Server Error');
    }
});


//Route 3: Update an existing note using PUT method: "/api/notes/updatenote/:id" login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send('Note not found') };

        // allow update only if the user is the owner of the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not authorized');
        
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        return res.json({ note });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send('Internal Server Error');
    }
});


//Route 4: Delete an existing note using DELETE method: "/api/notes/deletenote" login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send('Note not found') };

        //allow delete only if the user is the owner of the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not authorized');
        }
        note = await Note.findByIdAndDelete(req.params.id);
        return res.json({ 'success': "Note has been deleted", note: note });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;