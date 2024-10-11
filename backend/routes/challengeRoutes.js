const express = require('express');
const { fetchDailyChallenge } = require('../controllers/challengeController');
const router = express.Router();

router.get('/', fetchDailyChallenge);

module.exports = router;