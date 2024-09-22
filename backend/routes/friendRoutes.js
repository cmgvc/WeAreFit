const express = require('express');
const {getFriends, addFriend, deleteFriend} = require('../controllers/friendController.js');
const router = express.Router();

// Add a friend
router.post('/add', addFriend);

// Get all friends
router.get('/:userId', getFriends);

// Delete a friend
router.delete('/delete', deleteFriend);