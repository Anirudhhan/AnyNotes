const express = require('express');
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// fetch all the notes
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// add a new notes
router.post('/add-note', fetchuser, [
    body('title').notEmpty().withMessage('Notes should contain a title'),
    body('description').notEmpty().withMessage('Notes should contain a description'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, tag } = req.body;
        const note = new Notes({ user: req.user.id, title, description, tag });
        await note.save();  // Explicitly saving instead of `Notes.create()`
         
        res.status(201).json(note); // ✅ Send only the note object
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});



// update notes
router.put('/update-note/:id', fetchuser, async (req, res) => {
    try {
        const {title, description, tag} = req.body;
    
        const newNote = {};
        if(title) newNote.title = title;
        if(description) newNote.description = description;
        if(tag)newNote.tag = tag;

        // 🔥 Update the date whenever a note is modified
        newNote.date = Date.now(); 
    
        let note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).json({error: "no notes found"});

        // Check if the logged-in user owns this note
        if(note.user.toString() !== req.user.id){
            return res.status(401).json({error: "NOT ALLOWED!"});
        }    

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json({note});
    } catch (error) {
        console.error(error.message); 
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// update notes
router.delete('/delete-note/:id', fetchuser, async (req, res) => {
    try {

        let note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).json({error: "no notes found"});

        // Check if the logged-in user owns this note
        if(note.user.toString() !== req.user.id){
            return res.status(401).json({error: "NOT ALLOWED!"});
        }    

        await Notes.findByIdAndDelete(req.params.id);
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);  
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;