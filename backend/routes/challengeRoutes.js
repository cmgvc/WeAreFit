const express = require('express');
const { fetchDailyChallenge, fetchPastChallenges } = require('../controllers/challengeController.js');
const router = express.Router();

router.get('/', fetchDailyChallenge);
router.get('/history', fetchPastChallenges)

module.exports = router;