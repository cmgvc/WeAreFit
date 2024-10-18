const express = require('express');
const {completeTask, getProgressByDate, updateProgress, deleteProgress, getStreak} = require('../controllers/progressController.js')
const router = express.Router();

// Add new completed task as new progress
router.post('/add', completeTask);

// Get all progress by date
router.post('/', getProgressByDate);

// Update progress difficulty
router.post('/update', updateProgress);

// Delete progress
router.delete('/delete/:id', deleteProgress);

// Get user progress streak
router.post('/streak', getStreak);

module.exports = router;