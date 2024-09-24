const express = require('express');
const {completeTask, getProgressByDate, updateProgress, deleteProgress} = require('../controllers/progressController.js')
const router = express.Router();

// Add new completed task as new progress
router.post('/add', completeTask);

// Get all progress by date
router.post('/', getProgressByDate);

// Update progress difficulty
router.put('/update/:id', updateProgress);

// Delete progress
router.delete('/delete/:id', deleteProgress);

module.exports = router;