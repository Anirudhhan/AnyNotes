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
],async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {title, description, tag} = req.body;
        const note = new Notes({ user: req.user.id, title, description, tag });
        await note.save();  // Explicitly saving instead of `Notes.create()`
         
        res.status(201).json({message: "Notes Created!", note});
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;