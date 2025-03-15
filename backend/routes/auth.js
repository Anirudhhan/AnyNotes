const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Fetching all notes...');
});

router.get('/login', (req, res) => {
    res.send('User logged in');
});

module.exports = router;
