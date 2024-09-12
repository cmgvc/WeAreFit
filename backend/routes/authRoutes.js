const express = require('express');
const {login, register} = require('../controllers/authController.js');
const router = express.Router();

// Register a new user
router.post('/register', register);

// Login an existing user
router.post('/login', login);

module.exports = router;