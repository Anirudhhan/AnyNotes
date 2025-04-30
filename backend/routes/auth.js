const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const router = express.Router();


// new users
router.post('/new-user', [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;

        //Check if a user with this email already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);  // Generate salt with 10 rounds
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword });

        const data = {
            user: {id: user.id}
        } 

        const authToken = jwt.sign(data, 'shhh');
        res.status(201).json({message: 'User created successfully!', authToken});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// fetch user
router.post('/login', [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').exists().withMessage('Password cannot be empty'),

],  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const {email, password } = req.body;
        let user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({ error: "User doesn't exists" });
        }

        const checkPass = await bcrypt.compare(password, user.password);
        if(!checkPass){
            return res.status(400).json({ error: "Invalid email or password" });        
        }
                const data = {
            user: {id: user.id}
        } 

        const authToken = jwt.sign(data, 'shhh');
        res.status(201).json({message: 'Login successful!', authToken});
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// fetch user
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password"); 
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
 