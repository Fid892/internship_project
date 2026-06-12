const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = require("../middleware/authMiddleware")

const router = express.Router();//took router from express
router.post('/register', async (req, res) => {
    const{name,email,password}= req.body;//we take data from bosy and put in this objects respectively.
    try {
        const existingUser = await User.findOne({ email });//we check if user already exist or not by email
        if (existingUser) {
            return res.status(400).json({ 
                    message: 'User already exists' });//if user exist then we send this message
        
    } 
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });//we create new user and hash the password
        await user.save();//we save the user in database
        res.status(201).json({
            message: "User registered successfully"
        })  
    } catch (err) {
        res.status(500).json({ message: 'Server error' });//if there is any error we send this message

    }
    });
module.exports= router;

//------------------------------------------------------
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Login successful",
            token: token
        });

    } catch (err) {
        return res.status(500).json({ message: "server error" });
    }
});