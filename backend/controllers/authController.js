const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

// Register a new user
exports.register = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        // Hash password before saving in database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({username, email, password: hashedPassword});
        await user.save();

        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        res.status(500).json({error: 'Server error'});
    }
}

// Login an existing user
exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.find({email});
        if (!user) {
            return res.status(400).json({error: 'Invalid email'});
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({error: 'Invalid password'});
        }

        // Generate JWT
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    } catch (error) {
        res.status(500).json({error: 'Server error'});
    }
}