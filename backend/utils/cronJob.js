var cron = require('node-cron');
const { generateDailyChallenge } = require('../controllers/challengeController');

var task = cron.schedule('0 0 * * *', async () => {
    await generateDailyChallenge()
    console.log('Daily challenge generated!');
});

task.start();