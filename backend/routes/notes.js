const express = require('express');
const router = express.Router();

router.get('/api/notes', (req, res) => {
    res.send('Fetching all notes...');
});

module.exports = router;