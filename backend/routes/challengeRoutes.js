const express = require('express');
const { fetchDailyChallenge } = require('../controllers/challengeController.js');
const router = express.Router();

router.get('/', fetchDailyChallenge);

module.exports = router;